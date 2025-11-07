import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Calendar,
    Clock,
    Gift,
    Image,
    Video,
    Heart,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
} from "lucide-react";

import { useTheme } from "@/hooks/useTheme";

type ScrapbookPage = {
    id: number;
    type: "cover" | "photo" | "video" | "wishes" | "countdown";
    title: string;
    content: any;
};

const photos = [{
    id: 1,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20celebration%20cake%20candles%20friends%20happiness&sign=6c29c5191181def45ecb94f7760c6714",
    caption: "生日蛋糕时刻"
}, {
    id: 2,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20gift%20surprise%20excitement%20smile&sign=bc25af64100aeeb202ffa7ddfd39fc1b",
    caption: "拆开礼物的惊喜"
}, {
    id: 3,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=group%20photo%20friends%20birthday%20party%20fun&sign=492c664884d3dab050643ac60dbb7135",
    caption: "朋友们的合影"
}, {
    id: 4,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20decoration%20balloons%20streamers%20colorful&sign=addd70936f25393fe149876f3b87026d",
    caption: "精心布置的场地"
}, {
    id: 5,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=blowing%20candles%20birthday%20wish%20smile&sign=eca6a801d4948bcd78aa404688947777",
    caption: "许愿吹蜡烛"
}, {
    id: 6,
    url: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20dinner%20delicious%20food%20friends&sign=9cf084552f30c781a40f8f54e5dc6061",
    caption: "美味的生日晚餐"
}];

const wishes = [{
    id: 1,
    name: "小明",
    content: "生日快乐！愿你的每一天都充满阳光和笑容！",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cartoon%20character%20boy%20happy&sign=119e946ac5c347505a0620ab223009a4"
}, {
    id: 2,
    name: "小红",
    content: "祝你生日快乐，永远年轻漂亮！",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cartoon%20character%20girl%20smile&sign=bedd15ea2eee4532aa65530b09fa349d"
}, {
    id: 3,
    name: "小李",
    content: "生日大快乐！今年一定要实现所有愿望！",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cartoon%20character%20man%20happy&sign=bb30f92224cd68c2ad3a5a65de950b2a"
}];

const videos = [{
    id: 1,
    title: "生日惊喜视频",
    thumbnail: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20surprise%20video%20thumbnail&sign=a96c11aa2692b29f162cde89fdc5f2fc",
    duration: "02:45"
}];

const calculateCountdown = () => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const diffTime = nextBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const createScrapbookPages = (): ScrapbookPage[] => {
    const pages: ScrapbookPage[] = [{
        id: 1,
        type: "cover",
        title: "生日手账",
        content: null
    }, {
        id: 2,
        type: "countdown",
        title: "生日倒计时",

        content: {
            days: calculateCountdown()
        }
    }, {
        id: 3,
        type: "video",
        title: "精彩瞬间",
        content: videos[0]
    }, {
        id: 4,
        type: "wishes",
        title: "温暖祝福",
        content: wishes
    }];

     for (let i = 0; i < photos.length; i += 2) {
        const photoPair = photos.slice(i, i + 2);

        pages.push({
            id: pages.length + 1,
            type: "photo",
            title: `美好回忆 ${Math.floor(i / 2) + 1}`,
            content: photoPair
        });
    }
    
    // 添加新的一页手账
    pages.push({
        id: pages.length + 1,
        type: "photo",
        title: "补充内容",
        content: []
    });
    
    // 添加竖屏视频页面
    pages.push({
        id: pages.length + 1,
        type: "video",
        title: "经济下行的美",
        content: {
            id: 2,
            title: "有一种经济下行的美",
            thumbnail: "https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_16_9&prompt=economic%20downturn%20aesthetic%20video%20thumbnail&sign=e811f33e1d50e5c243d990c405b8bfc3",
            duration: "01:30"
        }
    });
    
    // 添加新的带有背景图片和闪亮文字的页面
    pages.push({
        id: pages.length + 1,
        type: "photo",
        title: "思考时刻",
        content: []
    });
    
    // 添加新的带有金黄色和粉色文字的页面
    pages.push({
        id: pages.length + 1,
        type: "photo",
        title: "Quote Collection",
        content: []
    });
     // 添加带有蛋糕和彩带元素的新页面
    pages.push({
        id: pages.length + 1,
        type: "photo",
        title: "生日期待",
        content: []
    });
    
    return pages;
}

const PhotoPage = (
    {
        content,
        pageId
    }: {
        content: typeof photos;
        pageId: number;
    }
) => {
     const isSpecialPage = pageId === 5;
    const isSixthPage = pageId === 7;
    const isNewPage = pageId === 8;

    if (isSpecialPage) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className="h-full relative overflow-hidden">
                {}
                <div className="absolute inset-0">
                    <img
                        src="https://lf-code-agent.coze.cn/obj/x-ai-cn/303483083522/attachment/E088A72B5752F335E6C6B5056BBB3D16_20251107193623.jpg"
                        alt="六一背景"
                        className="w-full h-full object-cover" />
                </div>
                {}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.8
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            duration: 1
                        }}
                        className="text-center px-6">
                        <h2
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 relative inline-block">
                            <span className="relative z-10 text-blue-500 animate-pulse">Welcome to the 六一 era
                                                                                            </span>
                        </h2>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    if (isSixthPage) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className="h-full flex flex-col gap-6 p-4">
                {}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <iframe src="//player.bilibili.com/player.html?bvid=BV13B2gBcEsF&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" className="w-full h-auto aspect-video"></iframe>
                </div>
                <motion.div
                    initial={{
                        y: 20,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6
                    }}
                    className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg">
                    <p
                        className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium">素的，本女子就是这样在互联网上到处拉屎，闻着味道便能寻回所有的力气和手段。祝李冰雨女士在北京廊坊一辈子卖不出去
                                                                    </p>
                </motion.div>
            </motion.div>
        );
    }

     if (isNewPage) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className="h-full flex items-center justify-center p-6">
                <motion.div
                    initial={{
                        y: 20,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6
                    }}
                    className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-8 shadow-lg text-center">
                    <p
                        className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                        差点忘了这一坨😅
                    </p>
                </motion.div>
            </motion.div>
        );
    }
    
    // 新页面 - 带有背景图片和闪亮文字
    if (pageId === 10) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className="h-full relative overflow-hidden">
                {/* 背景图片 */}
                <div className="absolute inset-0">
                    <img
                        src="https://lf-code-agent.coze.cn/obj/x-ai-cn/303483083522/attachment/微信图片_20251107203015_63_5_20251107203431.jpg"
                        alt="思考时刻背景"
                        className="w-full h-full object-cover" />
                    {/* 半透明遮罩，使文字更清晰 */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                {/* 闪亮的橙色文字 */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8
                        }}
                        className="text-center max-w-2xl">
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 relative inline-block">
                            {/* 文字主体 - 闪亮的橙色效果 */}
                            <span className="relative z-10 text-orange-400 font-semibold tracking-wide">
                                除了这些高光时刻，也有死刑前的无谓挣扎和自我感动🌹
                            </span>
                            {/* 辉光效果 */}
                            <span className="absolute inset-0 text-orange-500 blur-md opacity-70 animate-pulse"></span>
                        </h2>
                    </motion.div>
                </div>
            </motion.div>
        );
     }
     
     // 新页面 - 带有金黄色和粉色文字的页面
     if (pageId === 11) {
         return (
             <motion.div
                 initial={{
                     opacity: 0
                 }}
                 animate={{
                     opacity: 1
                 }}
                 transition={{
                     duration: 1
                 }}
                 className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-purple-900/30">
                 <motion.div
                     initial={{
                         y: 20,
                         opacity: 0
                     }}
                     animate={{
                         y: 0,
                         opacity: 1
                     }}
                     transition={{
                         delay: 0.3,
                         duration: 0.8
                     }}
                     className="text-center max-w-2xl">
                     {/* 金黄色的文字 */}
                     <h2 className="text-2xl md:text-4xl font-bold mb-8 relative inline-block">
                         <span className="relative z-10 text-yellow-500 font-semibold tracking-wide">
                             Who Lives, Who Dies, Who Tells Your Story
                         </span>
                         {/* 金色辉光效果 */}
                         <span className="absolute inset-0 text-yellow-400 blur-md opacity-70 animate-pulse"></span>
                     </h2>
                     
                     {/* 粉色文字 */}
                     <p className="text-xl md:text-2xl font-medium relative inline-block">
                         <span className="relative z-10 text-pink-500">
                             It was the end of a decade, but the start of an age
                         </span>
                         {/* 粉色辉光效果 */}
                         <span className="absolute inset-0 text-pink-400 blur-md opacity-70 animate-pulse"></span>
                     </p>
                 </motion.div>
             </motion.div>
         );
     }
     
     // 新页面 - 带有蛋糕和彩带元素的页面
     if (pageId === 12) {
         return (
             <motion.div
                 initial={{
                     opacity: 0
                 }}
                 animate={{
                     opacity: 1
                 }}
                 transition={{
                     duration: 1
                 }}
                 className="h-full relative overflow-hidden flex items-center justify-center">
                 {/* 背景图片 - 蛋糕和彩带 */}
                 <div className="absolute inset-0">
                     <img
                         src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=birthday%20cake%20with%20candles%20and%20colorful%20streamers%20festive%20celebration&sign=920a236e08288a9409a58848a16889a5"
                         alt="生日蛋糕和彩带"
                         className="w-full h-full object-cover" />
                     {/* 半透明遮罩，使文字更清晰 */}
                     <div className="absolute inset-0 bg-black/30"></div>
                 </div>
                 
                 {/* 花字效果 */}
                 <motion.div
                     initial={{
                         y: 20,
                         opacity: 0
                     }}
                     animate={{
                         y: 0,
                         opacity: 1
                     }}
                     transition={{
                         delay: 0.3,
                         duration: 0.8
                     }}
                     className="text-center px-6 z-10">
                     <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
                         {/* 花字效果 - 使用渐变色和辉光动画 */}
                         <span className="relative z-10 text-white font-bold tracking-wide"
                               style={{
                                   textShadow: "0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #ff6b6b, 0 0 40px #ff6b6b",
                                   fontFamily: "'Comic Sans MS', cursive, sans-serif"
                               }}>
                             别死，期待下次生日
                         </span>
                         {/* 更强的辉光动画 */}
                         <span className="absolute inset-0 text-pink-400 blur-md opacity-70 animate-pulse"></span>
                     </h2>
                 </motion.div>
                 
                 {/* 飘落的彩带装饰动画 */}
                 <div className="absolute inset-0 overflow-hidden">
                     {[...Array(20)].map((_, i) => (
                         <motion.div
                             key={i}
                             className="absolute w-4 h-20 bg-gradient-to-b from-yellow-400 to-pink-500 rounded-full opacity-80"
                             style={{
                                 left: `${Math.random() * 100}%`,
                                 top: `-100px`,
                                 rotate: `${Math.random() * 360}deg`,
                                 scale: 0.5 + Math.random() * 0.5
                             }}
                             animate={{
                                 top: '100%',
                                 rotate: `${Math.random() * 720}deg`,
                                 opacity: [0.8, 1, 0.8, 0.5]
                             }}
                             transition={{
                                 duration: 5 + Math.random() * 10,
                                 repeat: Infinity,
                                 delay: Math.random() * 10,
                                 ease: "linear"
                             }}
                         />
                     ))}
                 </div>
             </motion.div>
         );
     }
     
    return (
        <div className="flex flex-col gap-6 h-full">
            {content.map((photo, index) => <></>)}
        </div>
    );
};

const VideoPage = (
    {
        content
    }: {
        content: typeof videos[0];
    }
) => {
    // 检查是否是竖屏视频页面
    const isVerticalVideoPage = content.id === 2;
    
    if (isVerticalVideoPage) {
        return (
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1
                }}
                className="h-full flex flex-col items-center justify-center gap-8 p-4">
                {/* 竖屏视频容器 */}
                <motion.div
                    initial={{
                        scale: 0.9,
                        opacity: 0
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 0.6
                    }}
                    className="w-full max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative">
                    {/* 视频占位图 */}
                    <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-full object-cover" />
                    
                     {/* 嵌入B站视频 */}
                    <div className="absolute inset-0">
                        <iframe 
                            src="//player.bilibili.com/player.html?isOutside=true&aid=115508380704087&bvid=BV1Zp2gBgEn9&cid=33794424996&p=1" 
                            scrolling="no" 
                            border="0" 
                            frameborder="no" 
                            framespacing="0" 
                            allowfullscreen="true"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                    
                    {/* 视频时长 */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {content.duration}
                    </div>
                </motion.div>
                
                {/* 配文 */}
                <motion.div
                    initial={{
                        y: 20,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 0.6
                    }}
                    className="text-center max-w-md px-4">
                    <p 
                        className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                        有一种经济下行的美
                    </p>
                </motion.div>
            </motion.div>
        );
    }
    
    // 原有视频页面内容
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            className="h-full relative overflow-hidden">
            {}
            <div className="absolute inset-0 bg-black">
                <img
                    src="https://lf-code-agent.coze.cn/obj/x-ai-cn/303483083522/attachment/wbe1_20251107175522.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-80" />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            {}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 1
                    }}
                    className="text-center px-6">
                    <h2
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-4 relative inline-block">
                        <span
                            className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 animate-pulse">Welcome to the One Day era
                                                                                 </span>
                        <span
                            className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 animate-pulse opacity-70 blur-sm"></span>
                    </h2>
                </motion.div>
            </div>
        </motion.div>
    );
};

const WishesPage = (
    {
        content
    }: {
        content: typeof wishes;
    }
) => {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.8
            }}
            className="h-full flex flex-col items-center justify-center p-4 gap-8">
            {}
            <motion.div
                initial={{
                    scale: 0.9,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                transition={{
                    delay: 0.3,
                    duration: 0.6
                }}
                className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
                {}
                <iframe
                    src="//player.bilibili.com/player.html?isOutside=true&aid=115508145888744&bvid=BV1PS2gBXEX8&cid=33792656082&p=1"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                    className="w-full aspect-video"></iframe>
            </motion.div>
            {}
            <motion.div
                initial={{
                    y: 20,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.6
                }}
                className="text-center max-w-2xl px-4">
                <h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">One Day最烂的创意
                                                        </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">这一段虽然很烂，但也并非不烂，至少让我知道就算把后面的楼P歪，我的脸也瘦不下来🥀
                                                        </p>
            </motion.div>
        </motion.div>
    );
};

const CountdownPage = (
    {
        content
    }: {
        content: {
            days: number;
        };
    }
) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                initial={{
                    scale: 0.8,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                transition={{
                    duration: 0.5
                }}
                className="text-center">
                <h3
                    className="text-3xl font-serif italic mb-8 text-gray-700 dark:text-gray-300">"Looking backwards might be the only way to move on"
                                                        </h3>
                <div
                    className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 dark:from-pink-500/20 dark:to-purple-600/20 border border-pink-200 dark:border-pink-800 rounded-2xl p-10 shadow-lg inline-block">
                    <div className="text-gray-500 dark:text-gray-400">The eras begin...</div>
                </div>
            </motion.div>
        </div>
    );
};

const CoverPage = () => {
    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 1
            }}
            className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-8">
                <motion.div
                    animate={{
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}>
                    <Heart
                        size={60}
                        className="text-pink-600 dark:text-pink-400"
                        fill="currentColor" />
                </motion.div>
            </div>
            <h1
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 text-transparent bg-clip-text">生日快乐！
                                                      </h1>
            <p
                className="text-xl md:text-2xl mb-8 max-w-lg mx-auto text-gray-600 dark:text-gray-300">老衲就这样灵巧地做了个网页</p>
            <div className="flex flex-col items-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">向左滑动开始浏览</p>
                <motion.div
                    animate={{
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}>
                    <ChevronRight className="text-pink-600 dark:text-pink-400" size={24} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function FlipPageScrapbook() {
    const {
        theme,
        toggleTheme
    } = useTheme();

    const [currentPage, setCurrentPage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const pages = createScrapbookPages();
    const containerRef = useRef<HTMLDivElement>(null);

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToPage = (index: number) => {
        setCurrentPage(index);
    };

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging)
            return;
    };

    const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging)
            return;

        const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextPage();
            } else {
                prevPage();
            }
        }

        setIsDragging(false);
    };

    const renderCurrentPage = () => {
        const page = pages[currentPage];

        switch (page.type) {
        case "cover":
            return <CoverPage />;
        case "countdown":
            return <CountdownPage content={page.content} />;
        case "photo":
            return <PhotoPage content={page.content} pageId={page.id} />;
        case "video":
            return <VideoPage content={page.content} />;
        case "wishes":
            return <WishesPage content={page.content} />;
        default:
            return null;
        }
    };

    return (
        <div
            className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-b from-pink-50 to-purple-50 text-gray-800"}`}>
            {}
            <nav
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1
                        className="text-lg font-bold text-pink-600 dark:text-pink-400 flex items-center">
                        <Heart className="inline-block mr-2" size={18} />生日手账
                                                                                  </h1>
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {currentPage + 1}/ {pages.length}
                        </span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="切换主题">
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                    </div>
                </div>
            </nav>
            {}
            <main className="container mx-auto px-4 pt-16 pb-28 min-h-screen flex flex-col">
                {}
                <div
                    ref={containerRef}
                    className="relative flex-1 my-8 overflow-hidden rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm shadow-xl"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{
                                opacity: 0,
                                x: isDragging ? 0 : currentPage > 0 ? 100 : -100
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            exit={{
                                opacity: 0,
                                x: currentPage < pages.length - 1 ? -100 : 100
                            }}
                            transition={{
                                duration: 0.4
                            }}
                            className="absolute inset-0 p-6">
                            {}
                            {renderCurrentPage()}
                        </motion.div>
                    </AnimatePresence>
                </div>
                {}
                <div className="flex justify-between items-center mt-6">
                    <motion.button
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPage === 0 ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "bg-pink-600 dark:bg-pink-700 text-white shadow-lg hover:bg-pink-700 dark:hover:bg-pink-800"} transition-all`}>
                        <ChevronLeft size={24} />
                    </motion.button>
                    {}
                    <div className="hidden md:flex space-x-2">
                        {pages.map((_, index) => <button
                            key={index}
                            onClick={() => goToPage(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentPage ? "bg-pink-600 dark:bg-pink-400 w-10" : "bg-gray-300 dark:bg-gray-700"}`}
                            aria-label={`跳转到第 ${index + 1} 页`} />)}
                    </div>
                    <motion.button
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPage === pages.length - 1 ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "bg-pink-600 dark:bg-pink-700 text-white shadow-lg hover:bg-pink-700 dark:hover:bg-pink-800"} transition-all`}>
                        <ChevronRight size={24} />
                    </motion.button>
                </div>
            </main>
            {}
            <footer
                className={`py-4 border-t ${theme === "dark" ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-600"}`}>
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>特别的生日手账网页 © {new Date().getFullYear()}</p>
                    <p className="mt-1 text-xs">用爱制作的数字记忆</p>
                </div>
            </footer>
        </div>
    );
}