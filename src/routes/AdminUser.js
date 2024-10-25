import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, nicknameCheck, userAdminUpdate, usernameCheck } from "../api";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [originalLoginId, setOriginalLoginId] = useState({});
  const [originalNickname, setOriginalNickname] = useState({});
  const [loginIdChecked, setLoginIdChecked] = useState({}); // 기본값 true로 설정
  const [nicknameChecked, setNicknameChecked] = useState({}); // 기본값 true로 설정
  const toast = useToast();

  // 사용자 목록 가져오기
  const { data, isError, isLoading } = useQuery(["users"], getUser, {
    onSuccess: (data) => {
      setUsers(data);
      const loginIdMap = {};
      const nicknameMap = {};
      data.forEach((user) => {
        loginIdMap[user.id] = user.loginId;
        nicknameMap[user.id] = user.nickname;
      });
      setOriginalLoginId(loginIdMap);
      setOriginalNickname(nicknameMap);

      // 각 사용자에 대해 기본적으로 true로 설정
      const initialCheckMap = data.reduce((acc, user) => {
        acc[user.id] = true;
        return acc;
      }, {});
      setLoginIdChecked(initialCheckMap);
      setNicknameChecked(initialCheckMap);
    },
  });

  // 사용자 업데이트 mutation
  const updateMutation = useMutation(userAdminUpdate, {
    onSuccess: () => {
      toast({
        title: "User updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Failed to update user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const checkDuplicateLoginId = async (userId) => {
    const loginId = document.getElementById(`loginId-${userId}`).value;
    if (loginId === originalLoginId[userId]) {
      setLoginIdChecked((prev) => ({ ...prev, [userId]: true }));
      toast({
        title: "ID is unchanged, no need to check.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await usernameCheck(loginId);
    const data = await response;

    if (data.isDuplicate) {
      setLoginIdChecked((prev) => ({ ...prev, [userId]: false }));
      toast({
        title: "This ID is already in use.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setLoginIdChecked((prev) => ({ ...prev, [userId]: true }));
      toast({
        title: "ID is available.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const checkDuplicateNickname = async (userId) => {
    const nickname = document.getElementById(`nickname-${userId}`).value;
    if (nickname === originalNickname[userId]) {
      setNicknameChecked((prev) => ({ ...prev, [userId]: true }));
      toast({
        title: "Nickname is unchanged, no need to check.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await nicknameCheck(nickname);
    const data = await response;

    if (data.isDuplicate) {
      setNicknameChecked((prev) => ({ ...prev, [userId]: false }));
      toast({
        title: "This nickname is already in use.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setNicknameChecked((prev) => ({ ...prev, [userId]: true }));
      toast({
        title: "Nickname is available.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdateUser = (userId) => {
    const userForm = {
      id: userId,
      loginId: document.getElementById(`loginId-${userId}`).value,
      password: document.getElementById(`password-${userId}`).value,
      nickname: document.getElementById(`nickname-${userId}`).value,
      name: document.getElementById(`name-${userId}`).value,
      phonenumber: document.getElementById(`phonenumber-${userId}`).value,
      email: document.getElementById(`email-${userId}`).value,
      role: document.getElementById(`role-${userId}`).value,
      active: 1, // Active 값을 수동으로 설정
    };

    updateMutation.mutate(userForm);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <div>
      <h1>Admin User Management</h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Login ID</Th>
            <Th>Password</Th>
            <Th>Nickname</Th>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>
                <Input
                  onChange={() => setLoginIdChecked((prev) => ({ ...prev, [user.id]: false }))}
                  id={`loginId-${user.id}`}
                  defaultValue={user.loginId}
                />
                <Button onClick={() => checkDuplicateLoginId(user.id)}>Check</Button>
              </Td>
              <Td>
                <Input id={`password-${user.id}`} defaultValue={user.password} />
              </Td>
              <Td>
                <Input
                  onChange={() => setNicknameChecked((prev) => ({ ...prev, [user.id]: false }))}
                  id={`nickname-${user.id}`}
                  defaultValue={user.nickname}
                />
                <Button onClick={() => checkDuplicateNickname(user.id)}>Check</Button>
              </Td>
              <Td>
                <Input id={`name-${user.id}`} defaultValue={user.name} />
              </Td>
              <Td>
                <Input id={`phonenumber-${user.id}`} defaultValue={user.phonenumber} />
              </Td>
              <Td>
                <Input id={`email-${user.id}`} defaultValue={user.email} />
              </Td>
              <Td>
                <Select id={`role-${user.id}`} defaultValue={user.role}>
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </Select>
              </Td>
              <Td>
                <Button
                  onClick={() => handleUpdateUser(user.id)}
                  isDisabled={!loginIdChecked[user.id] || !nicknameChecked[user.id]}
                >
                  Update
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
