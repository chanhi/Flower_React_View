import Cookie from "js-cookie";
import axios from "axios";
//---------------react-query를 이용한 api 파일--------------------
//---------------base URL------------------
const instance = axios.create({
    baseURL: "http://localhost:8081/api/",
    withCredentials: true,
});
//유저 정보 요청
export const getMe = () => instance.get("session-login/info")
.then((response) => {
    const userData = response.data;
    Cookie.set("userInfo", JSON.stringify(userData), {expires: 3});
    return userData;
}).catch((error) => {
    console.error('Error fetching user data:', error);
    throw error;
});
//친구 정보 요청
export const getFriends = () => instance.get("friend/getallfriend").then((response) => response.data);
//센서 데이터 요청
export const getData = () => instance.get("udp/sensor").then((response) => response.data);

export const getActuator = (type) => {
    instance.get(`udp/${type}`).then((response)=>response.data);
} 
//스크린샷
export const getScreenShot = () => instance.get("udp/screenshot").then((response)=>response.data);

//--------------------------------------게시글------------------------------------
//게시글 리스트 요청
export const getBoardList = () => instance.get("freeboard").then((response)=>response.data);
//최근 게시글 요청
export const getBoardRecentList = () => instance.get("freeboard/recent").then((response)=>response.data);
//해당 id 게시글 요청
export const getBoard = async (queryKey) => {
    const [_ ,boardId] = queryKey;
    const response = await instance.get(`freeboard/${boardId}`);
    return response.data;
}
//게시글 업로드
export const uploadBoard = (variables) => {
    instance.post(`freeboard/create`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//게시글 수정
export const editBoard = ({variables, id}) => {
    instance.put(`freeboard/${id}/update`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//게시글 삭제
export const deleteBoard = (id) => {
    instance.delete(`freeboard/${id}/delete`).then((response) => response.data);
}
//게시글 좋아요 개수
export const getLike = (id) => instance.get(`freeboard/${id}/getLike`).then((response)=>response.data);
//게시글 좋아요
export const postLike = (id) => instance.get(`freeboard/${id}/like`).then((response)=>response.data);
//댓글 요청
export const getComments = () => instance.get("comments").then((response)=>response.data);
//댓글 생성
export const uploadComment = (variables) => {
    instance.post(`freeboardcomment/create`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//대댓글 생성
export const uploadReComment = ({variables, id}) => {
    instance.post(`freeboardcomment/${id}/create`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//댓글 삭제
export const deleteComment = (id) => {
    instance.put(`freeboardcomment/${id}/delete`).then((response) => response.data);
}
//--------------------------------------공지사항------------------------------------
//공지사항 리스트 요청
export const getAnnounceList = () => instance.get("announces").then((response)=>response.data);
//최근 공지사항 요청
export const getAnnounceRecentList = () => instance.get("announces/recent").then((response)=>response.data);
//해당 id 공지사항 요청
export const getAnnounce = async (queryKey) => {
    const [_ ,boardId] = queryKey;
    const response = await instance.get(`announces/${boardId}`);
    return response.data;
}
//공지사항 업로드
export const uploadNotice = (variables) => {
    instance.post(`announces/create`, variables, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data);
}
//공지사항 수정
export const editNotice = ({variables, id}) => {
    instance.patch(`announces/${id}/edit`, variables, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data);
}
//공지사항 삭제
export const deleteNotice = (id) => {
    instance.delete(`announces/${id}`).then((response) => response.data);
}

//------------------------------------방명록------------------------------------
//해당 유저 정보
export const getHim = (userId) => {
    instance.get(`mypage/${userId}/userinfo`).then((response) => response.data);
}
//최근 쓴 게시글
export const getRecentWriteBoard = async (queryKey) => {
    console.log(queryKey);
    const [_ ,userId] = queryKey;
    console.log(userId);
    const response = await instance.get(`mypage/${userId}/recentfreeboard`);
    return response.data;
}
//최근 쓴 댓글
export const getRecentWriteComment = (userId) => {
    instance.get(`mypage/${userId}/recentfreeboardcomment`).then((response) => response.data);
}

//----------------------------------일기장----------------------------------
//일기장 리스트 요청
export const getDiariesList = (id) => instance.get(`diaries/${id}`).then((response)=>response.data);
//일기장 요청
export const getDiary = (userId, diaryId) => instance.get(`diaries/${userId}/${diaryId}`).then((response)=>response.data);
//일기장 업로드
export const uploadDiary = (variables) => {
    instance.post(`diaries/create`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//일기장 수정
export const editDiary = ({variables, id, userId}) => {
    instance.put(`diaries/${userId}/${id}/update`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}
//일기장 삭제
export const deleteDiary = (boardId, userId) => {
    instance.put(`diaries/${userId}/${boardId}/delete`).then((response) => response.data);
}

//----------------------------------회원 관련------------------------------------
export const signUp = (variables) => {
    instance.post(`usermanage/create`, variables, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data);
}

export const usernameCheck = async (loginId) => 
    instance.get(`usermanage/check-duplicate?loginId=${encodeURIComponent(loginId)}`).then((response) => response.data);

export const nicknameCheck = async (nickname) => 
    instance.get(`usermanage/check-nickname-duplicate?nickname=${encodeURIComponent(nickname)}`).then((response) => response.data);

export const isFriend = (userId) => instance.get(`friend/isfriendwith/${userId}`).then((response) => response.data);

export const logIn = (variables) => {
    instance.post(`session-login/login`, variables, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data);
}

export const logOut = () => {
    instance.post(`session-login/logout`, null, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        Cookie.remove("userInfo");
        return response.data;
    }).catch((error) => {
        console.error('Error during logout:', error);
        throw error;
    });
}