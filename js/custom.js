chrome.tabs.query(
    {
        active:true,
        lastFocusedWindow:true
    },
    tabs=>{
        let TabUrl=tabs[0].url;
       let TabUrlArray= TabUrl.split("=");
       let VideoID=TabUrlArray[1]
        GetVideoDetails(VideoID)
    }
);


function GetVideoDetails(VideoID) {
    let APIKey="AIzaSyAsxja5bWhuw7mY4TXMzrqNxtV-O1XIE2U";
    let VideoUniqueID=VideoID;
    let RestURL="https://www.googleapis.com/youtube/v3/videos?id="+VideoUniqueID+"&key="+APIKey+"&part=snippet,contentDetails,statistics,status";

    axios.get(RestURL).then(function (res) {
        let JSONData=res.data;


        let Res_VideoTitle= JSONData['items'][0]['snippet']['title']
        let Res_VideoTags= (JSONData['items'][0]['snippet']['tags']).toString();
        let Res_PreviewThumbnails= JSONData['items'][0]['snippet']['thumbnails']['medium']['url']


        let Res_viewCount= JSONData['items'][0]['statistics']['viewCount']
        let Res_likeCount= JSONData['items'][0]['statistics']['likeCount']
        let Res_dislikeCount= JSONData['items'][0]['statistics']['dislikeCount']
        let Res_commentCount= JSONData['items'][0]['statistics']['commentCount']

        let Res_madeForKids= JSONData['items'][0]['status']['madeForKids']
        let Res_live= JSONData['items'][0]['snippet']['liveBroadcastContent']
        let Res_licensed= JSONData['items'][0]['contentDetails']['licensedContent']



        $('#VideoTitle').html(Res_VideoTitle)
        $('#tags').val(Res_VideoTags)
        $('#thumbnailPreview').attr('src',Res_PreviewThumbnails)



        $('#Comments').html(Res_commentCount)
        $('#Dislikes').html(Res_dislikeCount)
        $('#Likes').html(Res_likeCount)
        $('#Views').html(Res_viewCount)




        // licensed Status
        if(Res_licensed===true){
            $('#License').html("Yes")
        }
        else {
            $('#License').html("No")
        }


        // Kid Status
        if(Res_madeForKids===true){
            $('#Child').html("Yes")
        }
        else {
            $('#Child').html("No")
        }




        // Live Status
        if(Res_live==="none"){
            $('#Live').html("No")
        }
        else {
            $('#Live').html("Yes")
        }




        // Estimated Earning

        let EstimatedEarning=((parseFloat(Res_viewCount))*0.0001).toFixed(2)
        $('#Earning').html("$ "+EstimatedEarning)


        // Thumbnail Image
        $('#maxBTN').on('click',function () {
          let maxres=  JSONData['items'][0]['snippet']['thumbnails']['maxres']['url'];
            ForceDownload(maxres,"maxres.jpg")
        })

        $('#standardBTN').on('click',function () {
            let standard=  JSONData['items'][0]['snippet']['thumbnails']['standard']['url']
            ForceDownload(standard,"standard.jpg")
        })

        $('#highBTN').on('click',function () {
            let high=  JSONData['items'][0]['snippet']['thumbnails']['high']['url']
            ForceDownload(high,"high.jpg")
        })
        $('#MediumBTN').on('click',function () {
           let medium=  JSONData['items'][0]['snippet']['thumbnails']['medium']['url'];
           ForceDownload(medium,"medium.jpg")
        })

    }).catch(function (err) {

    })

}



function ForceDownload(URL,FileName) {
    chrome.downloads.download({
        url:URL,
        filename:FileName,
        saveAs:true
    })
    count=0;
}

