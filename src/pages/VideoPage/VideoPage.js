import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPage.css';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import VideoMetadata from '../../components/VideoMetadata/VideoMetadata';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInitiated = useRef(false); // Ref to track if fetch has been initiated

  useEffect(() => {
    // Only run the fetch if it hasn't been initiated yet for this videoId
    if (fetchInitiated.current) return;
    fetchInitiated.current = true;

    const fetchVideo = async () => {
      if (!videoId) {
        setError('Video ID is required');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // const result = await apiService.getVideo(videoId);
        // use hardcoded response for testing
        // to not get limited by the API

        const result = {
          success: true,
          data: {
            "metadata": {
              "id": "oody5g-VVmA",
              "url": "https://www.youtube.com/watch?v=oody5g-VVmA",
              "title": "KADIKÖY BOĞASI EV ZİYARETİ",
              "author": "testo taylan",
              "channelId": "UC1PluvjVa3GI5HJhul5lszg",
              "duration": "00:56:28",
              "description": "İİİİYYEEEAAAAAAAH, fenerbahçeye dair en güzel sesin evine konuk olduk, mustafa'nın masumiyetine hayran kaldığım bu ziyarette fenerbahçe sezonun son maçını kazandı, mahallede izdiham oldu, çocuklar kusura bakmasın, böyle bir kalabalıkla baş etmek mümkün değildi.\n\nSiz de bilinmeyen numaralara ve etiketlerinize bakmak için siz de bu linkten Getcontact'ı indirebilirsiniz: https://gtcinfluencers.onelink.me/fTJl?af_xp=custom&pid=Influencer2025&c=TR_TESTO2_YT\n\n\n\nAyrıcalıklardan yararlanmak için bu kanala katılın:\nhttps://www.youtube.com/channel/UC1PluvjVa3GI5HJhul5lszg/join",
              "keywords": [
                "kadıköy boğası",
                "testo taylan",
                "sultanbeyli",
                "ali koç",
                "mourinho",
                "kaos"
              ],
              "thumbnails": [
                {
                  "url": "https://i.ytimg.com/vi/oody5g-VVmA/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGGUgWihOMA8=&rs=AOn4CLCNWw1fVQdyin4bG0FtFjBQEeb3Iw",
                  "width": 168,
                  "height": 94,
                  "resolution": 15792
                },
                {
                  "url": "https://i.ytimg.com/vi/oody5g-VVmA/hqdefault.jpg?sqp=-oaymwE1CMQBEG5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGGUgWihOMA8=&rs=AOn4CLAIa_TEqYgJv21b1Dtq_so_EDc3lA",
                  "width": 196,
                  "height": 110,
                  "resolution": 21560
                },
                {
                  "url": "https://i.ytimg.com/vi/oody5g-VVmA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIFooTjAP&rs=AOn4CLBNG7ZcGLYaTVDGq7vBSWKcYpX2tQ",
                  "width": 246,
                  "height": 138,
                  "resolution": 33948
                },
                {
                  "url": "https://i.ytimg.com/vi/oody5g-VVmA/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIFooTjAP&rs=AOn4CLCbTk41i_aAHcBl4dM7CU7l5UemHA",
                  "width": 336,
                  "height": 188,
                  "resolution": 63168
                },
                {
                  "url": "https://i.ytimg.com/vi/oody5g-VVmA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgWihOMA8=&rs=AOn4CLDtUoW16u7RiEAaj5usMzhJKLCJ5g",
                  "width": 1920,
                  "height": 1080,
                  "resolution": 2073600
                },
                {
                  "url": "https://img.youtube.com/vi/oody5g-VVmA/default.jpg",
                  "width": 120,
                  "height": 90,
                  "resolution": 10800
                },
                {
                  "url": "https://img.youtube.com/vi/oody5g-VVmA/mqdefault.jpg",
                  "width": 320,
                  "height": 180,
                  "resolution": 57600
                },
                {
                  "url": "https://img.youtube.com/vi/oody5g-VVmA/hqdefault.jpg",
                  "width": 480,
                  "height": 360,
                  "resolution": 172800
                }
              ],
              "uploadDate": "2025-06-01T05:14:05-07:00",
              "viewCount": 5820861,
              "likeCount": 212672,
              "dislikeCount": 0
            },
            "videoStreams": [
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=315&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=7784662413&dur=3388.120&lmt=1748762743418110&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAOHmqhTguW5jqguKNCvm9BtHsuCPe0bJ42V89K1QTz0XAiEAxe9UxmEuW-4Tjv_ZjngST764AqPcBWy-Spt3juTA6wI%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 7784662413,
                "quality": "2160p50",
                "width": 3840,
                "height": 2160,
                "framerate": 50,
                "videoCodec": "vp09.00.51.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=401&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=3532256439&dur=3388.120&lmt=1748788329866368&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgOKTDIko_YXbBxvuSREN1QVjWVcnMM9tDUzM4fOmAnz8CIQDMLwRXU9nBiSsWfpUFHdk2QW6J9bV-77s23_i9Oh7yeA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 3532256439,
                "quality": "2160p50",
                "width": 3840,
                "height": 2160,
                "framerate": 50,
                "videoCodec": "av01.0.13M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=308&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=2367607157&dur=3388.120&lmt=1748763261425493&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgSX4EU61017KK4hZbY8FntlmGqGN-KawnXwFXxh5Xoj4CIDrjaGnb3de17XJwKrBWKgNETUImuEOXDcRlWAzLcI3A&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 2367607157,
                "quality": "1440p50",
                "width": 2560,
                "height": 1440,
                "framerate": 50,
                "videoCodec": "vp09.00.50.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=400&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1672939442&dur=3388.120&lmt=1748787455435870&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgFyhJX04zAXQduDJD8koM2c261qWERd5Rp1Kk2F1drfgCIDQD1IV0FVU039Std4eVLcRr_NhcMkakIflEm2MYYjQR&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 1672939442,
                "quality": "1440p50",
                "width": 2560,
                "height": 1440,
                "framerate": 50,
                "videoCodec": "av01.0.12M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=299&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=1364203655&dur=3388.120&lmt=1748786837242904&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAPogCsl2tP5JmwU2Ko54MbSa6uOzp0-mah0AjF7JUJVMAiEA3b7y-kRGLvo0_0K71EKKjtJZ1_j9PKdqBBiDTZChZO0%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 1364203655,
                "quality": "1080p50",
                "width": 1920,
                "height": 1080,
                "framerate": 50,
                "videoCodec": "avc1.64002A"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=303&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=911109677&dur=3388.120&lmt=1748761441034731&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJtR3HatCrqKREUqfAI8P7tx5_Yk60sUnTmrkh-2u1oeAiEA7pMrgn5zTQ89wFxM6n1c-7L3UEOka2h0dbj94CNOD4w%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 911109677,
                "quality": "1080p50",
                "width": 1920,
                "height": 1080,
                "framerate": 50,
                "videoCodec": "vp09.00.41.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=558498811&dur=3388.120&lmt=1748788463993162&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgO3n3FCpXwW77JYQHg2_ctjMSgvhSNs1YfRODx7wsIgkCICGWJEYBmjmgfaNGLPZ5cnYTHh2KAJIXDvfyQyhmD0sw&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 558498811,
                "quality": "1080p50",
                "width": 1920,
                "height": 1080,
                "framerate": 50,
                "videoCodec": "av01.0.09M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=298&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=722715711&dur=3388.120&lmt=1748786708453809&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAPNCtj1dVU4_qln_OGo0qiXWL_H9Re9Jp39CVmt8lcVNAiEAwKGL_Y6vLnt3ZQ8RiFDHxwkGh6d4FazX1r8AfwrnF8o%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 722715711,
                "quality": "720p50",
                "width": 1280,
                "height": 720,
                "framerate": 50,
                "videoCodec": "avc1.4D4020"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=302&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=465045853&dur=3388.120&lmt=1748759952915288&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgCSovqd8c6eX-4UjzdoNqnquP7jHEnUAc9mhnESBOn2ICIQCkr8LdHJePPAsY6mLFqYEB2BFC72k8S--5CAQKZIhQRg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 465045853,
                "quality": "720p50",
                "width": 1280,
                "height": 720,
                "framerate": 50,
                "videoCodec": "vp09.00.40.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=398&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=324794988&dur=3388.120&lmt=1748787292639287&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgVFGsNtEFYUPkKmOwr-jhWZv4fWYp32VGpeuxopZ7HmcCIQCUPS3quSLo15jzUiVin8orBlutHGDnp7fX1k3IHlSgnQ%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 324794988,
                "quality": "720p50",
                "width": 1280,
                "height": 720,
                "framerate": 50,
                "videoCodec": "av01.0.08M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=135&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=157233365&dur=3388.120&lmt=1748793120625160&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgPdRlnHT2EKnRqenSbHQhMh3DjU8lI9kSWwLEpaZsHk0CIA-bYx2FCt2G1Jd82y47lxcG3t0MRtQZ4EIoIBD0WFCB&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 157233365,
                "quality": "480p",
                "width": 854,
                "height": 480,
                "framerate": 25,
                "videoCodec": "avc1.4D401E"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=244&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=156074046&dur=3388.120&lmt=1748760133698024&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJU8JUlIn6Lk0UYEGAINgO6nwqq1XN2Ro-8VLpbe0qEJAiEAt9x0TUEcuea3xtr172QT_FOgnDIT04LlHN1JI_ixRnM%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 156074046,
                "quality": "480p",
                "width": 854,
                "height": 480,
                "framerate": 25,
                "videoCodec": "vp09.00.30.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=397&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=129023054&dur=3388.120&lmt=1748787222828809&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgMNpi0fH6lgFgAjCCfLdOse0EllT8XDYWsMStDGLWESYCIFrMGN7gABGwi8GrBDgs5bHQSOQPKmxCKUjt0074cU15&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 129023054,
                "quality": "480p",
                "width": 854,
                "height": 480,
                "framerate": 25,
                "videoCodec": "av01.0.04M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=134&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=93083524&dur=3388.120&lmt=1748787476669414&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhALttx3-ifmi2r8ZtC-xr86tPFmVus-AaTshbmxugUXC7AiBUSlNUzudscGszFweEpWgLKP1ZcuOJNyEsJuyQmrf1Rg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 93083524,
                "quality": "360p",
                "width": 640,
                "height": 360,
                "framerate": 25,
                "videoCodec": "avc1.4D401E"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=243&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=107226643&dur=3388.120&lmt=1748760102434198&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIF98cT6bHZ20IQvjJbdUMX0yJqDrUL0CKls-WF22rA-AiEAl1PqyV_Ps1oRuRwCY7yOHWl8cRa1_g7Z5klASaKJ5UI%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 107226643,
                "quality": "360p",
                "width": 640,
                "height": 360,
                "framerate": 25,
                "videoCodec": "vp09.00.21.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=396&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=76834744&dur=3388.120&lmt=1748786876422550&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgcvufOTtONRrm4thj7fml0yVONSJ2qWaBcM42VvNqdm0CIB5u_S-tljugvbDiFkNv6nNk06iLIL5E3hPKuG9wJLOp&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 76834744,
                "quality": "360p",
                "width": 640,
                "height": 360,
                "framerate": 25,
                "videoCodec": "av01.0.01M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=133&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=48823724&dur=3388.120&lmt=1748787494185121&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAL-cg2gvpFN7PSCKbV-5Y5LALYHduxVlO_FgmH61M1DMAiAIl3hdnA1PPByh7n67e_APJ8MrYnRo0e3MLpkC3RZqOA%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 48823724,
                "quality": "240p",
                "width": 426,
                "height": 240,
                "framerate": 25,
                "videoCodec": "avc1.4D4015"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=242&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=47738904&dur=3388.120&lmt=1748760097950546&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhANP8MrYcfaOaz5xKfogBaXcEToU3fBIu70dfauA6x0nGAiAwEqOrgJ5LMgl8Vk9JHKm1FwezREC_B0z4N29yRC4EeQ%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 47738904,
                "quality": "240p",
                "width": 426,
                "height": 240,
                "framerate": 25,
                "videoCodec": "vp09.00.20.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=395&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=42542217&dur=3388.120&lmt=1748786800455198&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgKetd0UXuqtZmgsHCnyUhHi1AVfV7pQStEF4b7u0jVxQCIAqKZKog9z1WpgvqoRvymEFHdN_dvkCTAx-YQgjmHNkZ&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 42542217,
                "quality": "240p",
                "width": 426,
                "height": 240,
                "framerate": 25,
                "videoCodec": "av01.0.00M.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=160&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=23158999&dur=3388.120&lmt=1748787520729405&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgPIEgQPOC6m2EZHHCLq6oQZcIlKTlIoQDK3VuCagWXDsCIFAUa6VSPnFSbp49U6kMKVNF50eJav2KHqjIoXFWPmSU&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 23158999,
                "quality": "144p",
                "width": 256,
                "height": 144,
                "framerate": 25,
                "videoCodec": "avc1.4D400C"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fwebm&rqh=1&gir=yes&clen=31427251&dur=3388.120&lmt=1748760100917504&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhANa-OP3avlakTMDWVSAF4MRHg0aLqeV90ziyd2KJkszGAiEApdY4FBWXNpKbVzee33LGqhbj7AMOV0EEmHR_DOQnvxc%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 31427251,
                "quality": "144p",
                "width": 256,
                "height": 144,
                "framerate": 25,
                "videoCodec": "vp09.00.11.08"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=394&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=25107389&dur=3388.120&lmt=1748786666921922&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4537534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAOhT-x0DpMiMY2whpXgV4jSZgtaeEgpkOS352W6IVaLWAiEAxLioD_3JBpcu8hmByH85FRd-3sAVuf8oqWZeCyHMJxw%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 25107389,
                "quality": "144p",
                "width": 256,
                "height": 144,
                "framerate": 25,
                "videoCodec": "av01.0.00M.08"
              }
            ],
            "audioStreams": [
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=20661932&dur=3388.255&lmt=1748774414067414&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgGnXewxU2qaBouz-rUhIMKrldYHOfZxjjFaWyegPqV4ACIBN7TQpn3fE8puu8QXFW4xOlixTijmuT2xKuvfqvXf_I&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 20661932,
                "quality": "mp4a.40.5",
                "bitrate": 53055,
                "audioCodec": "mp4a.40.5"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=20661993&dur=3388.255&lmt=1748774491961760&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgFMJESfmVVF4fBJ6j1yLuWgZ6R-5RcTk9dY8wZgElB4gCIQDlD5glKJbfryK-xCM1aO3ULGjpZXr1GZlGOPKpyxbcjw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 20661993,
                "quality": "mp4a.40.5",
                "bitrate": 53069,
                "audioCodec": "mp4a.40.5"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=54834992&dur=3388.185&lmt=1748774414163914&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAOm0rtFONsxQJxFbhlmCS4vQIcOvoGtdw73EvR7RKsXOAiAu1bxMEPwgPYQWaMqS9OAYiosRq2YL_c5laynj4Z9h0Q%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 54834992,
                "quality": "mp4a.40.2",
                "bitrate": 133529,
                "audioCodec": "mp4a.40.2"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=54834675&dur=3388.162&lmt=1748774491972465&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhANupNm5VlGsV3YoiVO4uhlpC_1p_V0XG7gE6z7d9AW8RAiEAtyVbOHrKPTIWnmfQFy0Le9tR4UEuRi977BsnU7j8p0o%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "mp4",
                "size": 54834675,
                "quality": "mp4a.40.2",
                "bitrate": 133509,
                "audioCodec": "mp4a.40.2"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=20745721&dur=3388.141&lmt=1748758095620050&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJSe8IWnbqUrux2CcbYEYngGMQFCKl38pvgs3JsDlw49AiEA_U_xlT3PYz78ofWHtku0o-kxoCoRtLOHaY5gBkPjfMs%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 20745721,
                "quality": "opus",
                "bitrate": 52472,
                "audioCodec": "opus"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=20757661&dur=3388.141&lmt=1748774675379469&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAMKb9LKkrF1YfhCBc530Ym-wgany1efAOS2OlICdpu2JAiEAupKd8-duexWcsoSZL9PTtiLSeJGXevHDbG-wIS7UW7c%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 20757661,
                "quality": "opus",
                "bitrate": 52052,
                "audioCodec": "opus"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=22703939&dur=3388.141&lmt=1748758095599183&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgQyCe93D24y0UGKWI-rg0NcciGdhyQ0HqQ2L55kXMr08CIDGqdE4nDVgeYaRtOdJ5NXRmApY79SVgYrATAh4j4Hju&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 22703939,
                "quality": "opus",
                "bitrate": 64877,
                "audioCodec": "opus"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=22770919&dur=3388.141&lmt=1748774675363982&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAPuJrOS0QpU3bBxqs2CqKYZQiiuG-Yb3Y5Je6CSP2V8gAiEAxGfg9wpX2W1Phyf9JXAVDOrc-a58hpg4bjzjMvQMBJM%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 22770919,
                "quality": "opus",
                "bitrate": 64828,
                "audioCodec": "opus"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=42508004&dur=3388.141&lmt=1748758095852320&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAJru8RUFkaNB19vMbwejv-FX0XSsojzHmTA1JkOn94bbAiBmnDqpcl2GCCpsSoj7TRlNrmCZxPkeFoGA6Uny6fCwJg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 42508004,
                "quality": "opus",
                "bitrate": 128430,
                "audioCodec": "opus"
              },
              {
                "url": "https://rr3---sn-u0g3oxu-xnce.googlevideo.com/videoplayback?expire=1749930680&ei=WH5NaJXSIL_K6dsP_5LO-QU&ip=31.223.74.95&id=o-ACWqSAY0iUs35neQVY1__dztd-l3C5VK6Zs7TZOfDot3&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1749909080%2C&mh=Wz&mm=31%2C29&mn=sn-u0g3oxu-xnce%2Csn-nv47lns6&ms=au%2Crdu&mv=m&mvi=3&pl=24&rms=au%2Cau&initcwndbps=1718750&bui=AY1jyLMdawWs1KgwS7pPULT809rg21PH3N5OYvCZ8GwFeMFcSRZITZd1AgrmhrS30vIAGg5-OCYgCQdh&spc=l3OVKYCuprAf&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fwebm&rqh=1&gir=yes&clen=42651407&dur=3388.141&lmt=1748774675422406&mt=1749908706&fvip=1&keepalive=yes&c=IOS&txp=4532534&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgPnIcau58IIb9DZzkRXPQVsyMLkEBFBlznv7cv6cRn9oCIES6OpogXVkl-wPYj2EAtqnKRHTRJ0PlWClVStNzDddD&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcxVKmZkKUfbCPAmhM018EDJGjV17qhcc9bn8KP0b3ngCIGVubnd97Cj3-I4bqnI3fuqGntLf74MES0hD21mfNI4u",
                "container": "webm",
                "size": 42651407,
                "quality": "opus",
                "bitrate": 128485,
                "audioCodec": "opus"
              }
            ]
          }
        };
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (result.success) {
          setVideoData(result.data);
        } else {
          setError(result.error?.message || 'Failed to load video');
          toast.error('Failed to load video');
        }
      } catch (error) {
        console.error('Video fetch error:', error);
        setError('Something went wrong');
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]); // Keep videoId in dependency array to refetch if it changes

  // Reset the fetch flag when the component unmounts or videoId changes
  useEffect(() => {
    return () => {
      fetchInitiated.current = false;
    };
  }, [videoId]);

  if (isLoading) {
    return (
      <main className="video-page">
        <div className="video-page-content">
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading video...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !videoData) {
    return (
      <main className="video-page">
        <div className="video-page-content">
          <div className="video-error">
            <h2>Video not found</h2>
            <p>{error || 'The video you requested could not be found.'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="video-page">
      <div className="video-page-content">
        <div className="video-container">
          <VideoPlayer
            videoStreams={videoData.videoStreams}
            audioStreams={videoData.audioStreams}
            metadata={videoData.metadata}
          />
        </div>
        <div className="video-info">
          <VideoMetadata metadata={videoData.metadata} />
        </div>
      </div>
    </main>
  );
};

export default VideoPage; 