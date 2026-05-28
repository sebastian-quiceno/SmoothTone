import { create } from "zustand"
import { type Track } from "../types/song"
import { songService } from "../services/songService"
import { userSongService } from '../services/userSongService'

const audio = new Audio()

interface PlayerStore {
  currentTrack: Track | null
  queue: Track[]
  currentIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  play: (track: Track, queue?: Track[], userSongId?:number) => Promise<void>
  pause: () => void
  resume: () => Promise<void>
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setQueue: (tracks: Track[]) => void
  enqueue: (track: Track) => void
  enqueueNext: (track: Track) => void
  removeFromQueue: (trackId: number) => void
  next: () => Promise<void>
  previous: () => Promise<void>
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,

  // ======================================================
  // PLAY (NOW FETCHES URL FROM BACKEND)
  // ======================================================
  play: async (track, queue) => {
    try {
      //pedir URL al backend
      const url = await songService.getAudioUrl(track.id)

      //set audio source dinámico
      audio.src = url

      await audio.play()

      const index =
        queue?.findIndex((t) => t.id === track.id) ?? 0

      set({
        currentTrack: track,
        queue: queue ?? get().queue,
        currentIndex: index,
        isPlaying: true
      })
    } catch (error) {
      console.error("Error playing track:", error)
    }
  },

  // ======================================================
  pause: () => {
    audio.pause()
    set({ isPlaying: false })
  },

  // ======================================================
  resume: async () => {
    try {
      await audio.play()
      set({ isPlaying: true })
    } catch (error) {
      console.error(error)
    }
  },

  // ======================================================
  seek: (time) => {
    audio.currentTime = time
    set({ currentTime: time })
  },

  // ======================================================
  setVolume: (volume) => {
    audio.volume = volume
    set({ volume })
  },

  // ======================================================
  setQueue: (tracks) => {
    set({ queue: tracks })
  },

  // ======================================================
  // ENQUEUE: add track to end of queue
  // ======================================================
  enqueue: (track) => {
    set((state) => ({ queue: [...state.queue, track] }))
  },

  // ======================================================
  // ENQUEUE NEXT: insert track right after currentIndex
  // ======================================================
  enqueueNext: (track) => {
    const { queue, currentIndex } = get()
    const insertIndex = Math.min(currentIndex + 1, queue.length)
    const newQueue = [...queue.slice(0, insertIndex), track, ...queue.slice(insertIndex)]
    set({ queue: newQueue })
  },

  // ======================================================
  // REMOVE FROM QUEUE
  // Adjust currentIndex if necessary
  // ======================================================
  removeFromQueue: (trackId) => {
    const { queue, currentIndex, currentTrack } = get()
    const newQueue = queue.filter((t) => t.id !== trackId)

    let newIndex = currentIndex

    // If removed item is before currentIndex, shift index left
    const removedIndex = queue.findIndex((t) => t.id === trackId)
    if (removedIndex !== -1 && removedIndex < currentIndex) {
      newIndex = Math.max(0, currentIndex - 1)
    }

    // If current track was removed, stop playback
    if (currentTrack?.id === trackId) {
      audio.pause()
      set({ isPlaying: false, currentTrack: null, currentIndex: 0, queue: newQueue })
      return
    }

    set({ queue: newQueue, currentIndex: newIndex })
  },

  // ======================================================
  next: async () => {
    const { queue, currentIndex } = get()

    const nextIndex = currentIndex + 1

    if (nextIndex >= queue.length) return

    const nextTrack = queue[nextIndex]

    try {
      const url = await songService.getAudioUrl(nextTrack.id)

      audio.src = url
      await audio.play()

      set({
        currentTrack: nextTrack,
        currentIndex: nextIndex,
        isPlaying: true
      })
    } catch (error) {
      console.error("Error playing next track:", error)
    }
  },

  // ======================================================
  previous: async () => {
    const { queue, currentIndex } = get()

    const prevIndex = currentIndex - 1

    if (prevIndex < 0) return

    const prevTrack = queue[prevIndex]

    try {
      const url = await songService.getAudioUrl(prevTrack.id)

      audio.src = url
      await audio.play()

      set({
        currentTrack: prevTrack,
        currentIndex: prevIndex,
        isPlaying: true
      })
    } catch (error) {
      console.error("Error playing previous track:", error)
    }
  }
}))


//EVENT LISTENERS

audio.addEventListener("timeupdate", () => {
  usePlayerStore.setState({
    currentTime: audio.currentTime
  })
})

audio.addEventListener("loadedmetadata", () => {
  usePlayerStore.setState({
    duration: audio.duration
  })
})

audio.addEventListener("play", () => {
  usePlayerStore.setState({ isPlaying: true })
})

audio.addEventListener("pause", () => {
  usePlayerStore.setState({ isPlaying: false })
})

audio.addEventListener("ended", async () => {
  const { next } = usePlayerStore.getState()

  await next()
})