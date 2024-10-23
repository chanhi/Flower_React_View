import { Box, Button, Divider, Flex, FormControl, HStack, Input, Stack, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, deleteComment, postLike, uploadComment, uploadReComment } from "../api";
import { useForm } from "react-hook-form";
import { StarIcon } from "@chakra-ui/icons";
import Cookie from "js-cookie";

export default function BorderShow() {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const [isCLoading, setCIsLoading] = useState(true);
    const [commentDatas, setCommentDatas] = useState([]);
    const [isLLoading, setLIsLoading] = useState(true);
    const [likeDatas, setLikeDatas] = useState([]);
    const { boardId } = useParams();
    const { register, handleSubmit } = useForm({ defaultValues: { "cmPostId": boardId } });
    const navigate = useNavigate();
    const userCookie = Cookie.get("userInfo");
    const userInfo = userCookie ? JSON.parse(userCookie) : null;
    const userId = userInfo.id;

    // 댓글 업로드 mutation
    const commentMutation = useMutation(uploadComment, {
        onSuccess: () => {
            window.location.reload();
        },
    });

    const onSubmit = (data) => {
        commentMutation.mutate(data);  // 댓글 작성 요청
    };

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}`);
        const json = await response.json();
        setDatas(json);
        setIsLoading(false);
    };

    const fetchComment = async () => {
        const response = await fetch(`http://localhost:8081/api/freeboardcomment/${boardId}`);
        const json = await response.json();
        setCommentDatas(json);
        setCIsLoading(false);
    };

    const fetchLike = async () => {
        const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}/getlike`);
        const json = await response.json();
        setLikeDatas(json);
        setLIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        fetchComment();
        fetchLike();
    }, []);

    const likeMutaion = useMutation(postLike, {
        onSuccess: () => {
            window.location.reload();  // 성공 시 페이지 새로고침
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
    });

    const handlelike = () => {
        likeMutaion.mutate(boardId);
    };

    const onDeleteButtonClick = () => {
        deleteBoard(boardId);
        //const response = await fetch(`http://localhost:8081/api/freeboard/${boardId}/delete`, {method: 'DELETE'});
        navigate('/board/main');
    }

    // 댓글을 부모/대댓글 구조로 분리하는 함수
    const groupCommentsByParent = (comments) => {
        const commentMap = {};
        comments.forEach(comment => {
            commentMap[comment.id] = { ...comment, recomments: [] };
        });
        comments.forEach(comment => {
            if (comment.parentCommentId !== null && commentMap[comment.parentCommentId]) {
                commentMap[comment.parentCommentId].recomments.push(comment);
            }
        });
        return Object.values(commentMap).filter(comment => comment.parentCommentId === null);
    };

    const groupedComments = groupCommentsByParent(commentDatas);

    return (
        <Flex minH={'100vh'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
                {!isLoading ? 
                <HStack justify="space-between" px={5}>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        제목: {datas.title}
                    </Text>
                    <HStack>
                        <Text>작성자: {datas.user.nickname}</Text>:
                        <Text>좋아요: {likeDatas}</Text>:
                        <Text>작성일: {datas.regdate}</Text>
                    </HStack>
                </HStack>
                : null}
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'sm'} p={8}>
                    {!isLoading ? datas.content : null}
                    {datas.pictureBase64List ? datas.pictureBase64List.map((picture) => (
                        <img src={"data:image/jpeg;base64," + picture} alt="게시글 이미지" />
                    )) : null}
                    <Stack align="center">
                        <Button w={100} h={20} onClick={handlelike}>
                            <Stack align="center">
                                <StarIcon />
                                <Text>좋아요</Text>
                            </Stack>
                        </Button>
                    </Stack>
                </Box>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'sm'} p={8}>
                    <Box>댓글</Box>
                    <HStack as="form" mb={7} id="commentForm" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <Textarea {...register("content", { required: true })} type="text" required />
                        </FormControl>
                        <Button type="submit" _hover={{ bg: 'blue.500' }}>입력</Button>
                    </HStack>

                    <Stack>
                        <Box>
                            {/* 부모 댓글과 대댓글을 표시 */}
                            {groupedComments.map((comment) => (
                                <RecursiveComment 
                                    key={comment.id} 
                                    comment={comment} 
                                    boardId={boardId}
                                    userId={userId}
                                />
                            ))}
                        </Box>
                    </Stack>
                </Box>
                {!isLLoading && !isLoading ? 
                <HStack justify="flex-end">
                    {userId == datas.user.id ? 
                    <HStack>
                        <Link to={`/board/edit/${boardId}`}>
                            <Button>수정</Button>
                        </Link>
                        <Button onClick={onDeleteButtonClick}>삭제</Button>
                    </HStack>
                    : null}
                    <Link to={`/board/main`}>
                        <Button>목록</Button>
                    </Link>
                </HStack>
                :null}
            </Stack>
        </Flex>
    );
}

// 재귀적으로 댓글과 대댓글을 렌더링하는 컴포넌트
function RecursiveComment({ comment, boardId, userId }) {
    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: () => {
            window.location.reload();  // 성공 시 페이지 새로고침
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        },
    });

    const handleDeleteComment = (commentId) => {
        deleteCommentMutation.mutate(commentId);
    };
    return (
        <Stack mb={4}>
            <Divider borderColor={"black"} />
            <Box>{comment.user.loginId}</Box>
            {!comment.disable ? 
            <HStack justifyContent={"space-between"}>
                <Box>{comment.content}</Box>
                {userId == comment.user.id ? 
                <HStack>
                    <Box>{comment.regdate}</Box>
                    <Button size="sm">수정</Button>
                    <Button size="sm" color={"red"} onClick={() => handleDeleteComment(comment.id)}>삭제</Button>
                </HStack>
                : null}
            </HStack>
            :
            <HStack justifyContent={"space-between"}>
                <Box>{comment.content}</Box>
                <Box></Box>
            </HStack>}

            {/* 대댓글 입력 폼 */}
            <ReCommentForm comment={comment} boardId={boardId} />

            {/* 대댓글들 표시 */}
            {comment.recomments && comment.recomments.length > 0 && comment.recomments.map((recomment) => (
                <HStack key={recomment.id}>
                    <Box w={10}></Box> {/* 대댓글 들여쓰기 */}
                    <RecursiveComment comment={recomment} boardId={boardId} userId={userId} />
                </HStack>
            ))}
        </Stack>
    );
}

// 대댓글 작성 폼 컴포넌트
function ReCommentForm({ comment, boardId }) {
    const { isOpen, onToggle } = useDisclosure();  // Chakra UI의 useDisclosure로 토글 기능 구현
    const { register, handleSubmit, reset } = useForm({defaultValues: {"cmPostId": boardId}});

    const reMutation = useMutation(uploadReComment, {
      onSuccess: (data) => {
          window.location.reload();
      }
    })
    const handleReCommentSubmit = (data) => {
        const payload = {variables: data, id: comment.id};
        reMutation.mutate(payload);
        reset();
    };

    return (
        <Stack>
            {comment.disable ? null :<Button onClick={onToggle} w={20} size="sm">답글 달기</Button>}
            {isOpen && (
                <HStack as="form" onSubmit={handleSubmit(handleReCommentSubmit)}>
                    <Input {...register("content", { required: true })} size={'sm'} type="text" required />
                    <Button type="submit" size="sm">확인</Button>
                </HStack>
            )}
        </Stack>
    );
}
