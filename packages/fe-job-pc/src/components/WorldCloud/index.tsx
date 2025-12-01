import WordCloud from 'wordcloud'
import React, { useEffect, useRef } from 'react'

const Index = () => {
    const ref = useRef(null)
    useEffect(() => {
        WordCloud(ref.current, {
            list: [
                ['foo', 3],
                ['bar', 3],
                ['fmx', 2],
                ['wjn', 7],
                ['wkj', 12],
                ['jacklove', 5],
                ['紅樓夢', 14],
                ['賈寶玉', 12],
                ['林黛玉', 12],
                ['薛寶釵', 12],
                ['王熙鳳', 12],
                ['李紈', 12],
                ['賈元春', 12],
                ['賈迎春', 7],
                ['賈探春', 12],
                ['賈惜春', 12],
                ['秦可卿', 12],
                ['賈巧姐', 12],
                ['史湘雲', 12],
                ['妙玉', 12],
                ['賈政', 12],
                ['賈赦', 12],
                ['賈璉', 12],
                ['賈珍', 12],
                ['賈環', 12],
                ['賈母', 12],
                ['王夫人', 12],
                ['薛姨媽', 12],
                ['尤氏', 12],
                ['平兒', 12],
                ['鴛鴦', 12],
                ['紅樓夢', 12],
            ],
            rotateRatio: 0,
        })
    }, [])

    return (
        <div>
            <canvas ref={ref} width="300" height="200" />
        </div>
    )
}

export default Index
