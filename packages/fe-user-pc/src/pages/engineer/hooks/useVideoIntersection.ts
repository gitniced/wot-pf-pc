import { useEffect, useRef, useState } from 'react'

export const useVideoIntersection = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [hasPlayed, setHasPlayed] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        // 创建 Intersection Observer 实例
        observerRef.current = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    // 当视频进入视口且还没播放过时
                    if (entry.isIntersecting && !hasPlayed) {
                        video.play().catch(error => {
                            console.warn('视频播放失败:', error)
                        })
                        setHasPlayed(true)
                    }
                })
            },
            {
                // 当视频50%进入视口时触发
                threshold: 0.5,
                // 提前50px开始检测
                rootMargin: '50px',
            },
        )

        // 开始观察视频元素
        observerRef.current.observe(video)

        // 清理函数
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [hasPlayed])

    return { videoRef, hasPlayed }
}
