import React, { useState, useCallback } from 'react';
// 使用 useState 来管理视频列表、最新时间戳、是否还有更多视频和话题。
// 使用 useEffect 在组件挂载时加载初始视频。
// 使用 useCallback 来创建 fetchVideos 函数，避免不必要的重新渲染。

import '../style/VideoFeed.css'; // 引入样式
import { debounce } from 'lodash'; // 按钮防抖处理
import axios from 'axios';
// 使用 react-infinite-scroll-component 来实现无限滚动加载。
// import InfiniteScroll from 'react-infinite-scroll-component';
const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_PATH}`,
    timeout: 5000
});

const VideoFeed = () => {
    const [videos, setVideos] = useState([]); // 存储视频列表
    const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // 当前播放视频索引，-1 表示未播放任何视频
    const [latestTime, setLatestTime] = useState(0); // 用于请求的最新时间
    const [error, setError] = useState(null); // 错误信息
    const [hasMore, setHasMore] = useState(true); // 判断是否还有更多视频可请求

    const fetchVideos = useCallback(async () => {
        if (!hasMore) {
            setError('No more videos to fetch');
            return;
        }

        setError(null); // 清除之前的错误信息
        try {
            const response = await api.get('/feed', {
                params: {
                    latest_time: latestTime,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjIsImV4cCI6MTcyNzAzMDQzNiwibmJmIjoxNzI2ODU3NjM2LCJpYXQiOjE3MjY4NTc2MzZ9.CCVpq-LK2ufREoR5Rcdip-FfRAKW1I1Vq1zIPmW9VKU"
                }
            });

            const { video_list, next_time, status_code, status_msg } = response.data;

            if (status_code === 0) { // Assuming 0 is your constant.Success
                if (video_list && video_list.length > 0) {
                    setVideos(prevVideos => [...prevVideos, ...video_list]); // 将新视频添加到已有的视频列表中
                    // FIXME setCurrentVideoIndex(currentVideoIndex+1); // 将索引置为0，开始播放
                    // React 传递的当前状态值：当你调用 setCurrentVideoIndex 时，React 会自动将 currentVideoIndex 的最新值传递给回调函数，作为 prevIndex。
                    setCurrentVideoIndex(prevIndex => prevIndex + 1); // 使用回调函数更新 currentVideoIndex

                    setLatestTime(next_time);
                } else {
                    setHasMore(false); // 如果没有更多视频，则停止请求
                    setError('No more videos');
                }
            } else {
                setError(status_msg);
            }
        } catch (error) {
            setError('Error fetching video');
        } finally {

        }
    }, [latestTime, hasMore]);
    // 切换到下一个视频
    const handleNextVideo = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1); // 切换到下一个视频
        } else {
            fetchVideos(); // 如果当前视频列表看完了，再次请求新的视频
        }
    };

    const handleNextVideoWithdebounce = debounce(() => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1); // 切换到下一个视频
        } else {
            fetchVideos(); // 如果当前视频列表看完了，再次请求新的视频
        }
    }, 300); // 防抖时间设置为 300ms
    // 如果有错误信息，显示错误信息
    if (error) {
        return <div>Error: {error}</div>;
    }

    // 如果当前没有视频，提示没有视频可显示
    if (currentVideoIndex === -1 || !videos[currentVideoIndex]) {
        return (
            <div className="video-container">
                <h1>No video available</h1>
                <button onClick={fetchVideos}>Load Videos</button>
            </div>
        );
    }
    // 正常情况下显示视频播放器
    const currentVideo = videos[currentVideoIndex];
    return (
        <div className="video-container">
            <h1>Video Player</h1>
            <div className="video-wrapper">
                <video
                    key={currentVideo.play_url}  // 添加 key 属性
                    controls
                    autoPlay
                    loop
                    style={{ width: '100%', maxWidth: '500px' }}
                >
                    <source src={currentVideo.play_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <h3>{currentVideo.title}</h3>
            <p>Author: {currentVideo.author.name}</p>
            <p>Publish Time: {new Date(currentVideo.publish_time).toLocaleString()}</p>
            <button className="next-button" onClick={handleNextVideoWithdebounce}>Next Video</button>
        </div>
    );
};

export default VideoFeed;