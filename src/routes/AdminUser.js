import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Button,
    Select,
    HStack,
  } from "@chakra-ui/react";
  import { useMutation, useQuery } from '@tanstack/react-query';
  import { useForm, Controller } from "react-hook-form";
  import { getUser, usernameCheck, nicknameCheck, userAdminUpdate } from '../api'; // 가정된 API 함수
  
  export default function AdminUser() {
    // 사용자 리스트 가져오기
    const { data: users, isLoading } = useQuery(["getUsers"], getUser);
  
    const userMutation = useMutation(userAdminUpdate, {
      onSuccess: () => {
        alert("User updated successfully");
      },
      onError: () => {
        alert("Failed to update user");
      },
    });
  
    const { handleSubmit, control, setValue } = useForm(); // react-hook-form 사용
  
    if (isLoading) return <div>Loading...</div>;
  
    const checkLoginId = async (userId, loginId) => {
        console.log(loginId)
      const response = await usernameCheck(loginId);
      console.log(response);
      if (response.isDuplicate) {
        alert("이미 사용중인 ID 입니다.");
      } else {
        alert("사용가능한 ID 입니다.");
      }
    };
  
    const checkNickname = async (userId, nickname) => {
      const response = await nicknameCheck(nickname);
      if (response.isDuplicate) {
        alert("이미 사용중인 닉네임입니다.");
      } else {
        alert("사용가능한 닉네임입니다.");
      }
    };
  
    const onSubmit = (data) => {
      userMutation.mutate(data);
    };
  
    return (
      <Box mt={5}>
        <Table>
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
                  <HStack>
                    <Controller
                      name={`loginId-${user.id}`}
                      control={control}
                      defaultValue={user.loginId}
                      render={({ field }) => (
                        <Input {...field} />
                      )}
                    />
                    <Button
                      onClick={() => checkLoginId(user.id, user.loginId)}
                    >
                      Check
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  <Controller
                    name={`password-${user.id}`}
                    control={control}
                    defaultValue={user.password}
                    render={({ field }) => (
                      <Input {...field} />
                    )}
                  />
                </Td>
                <Td>
                  <HStack>
                    <Controller
                      name={`nickname-${user.id}`}
                      control={control}
                      defaultValue={user.nickname}
                      render={({ field }) => (
                        <Input {...field} />
                      )}
                    />
                    <Button
                      onClick={() => checkNickname(user.id, user.nickname)}
                    >
                      Check
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  <Controller
                    name={`name-${user.id}`}
                    control={control}
                    defaultValue={user.name}
                    render={({ field }) => (
                      <Input {...field} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name={`phonenumber-${user.id}`}
                    control={control}
                    defaultValue={user.phonenumber}
                    render={({ field }) => (
                      <Input {...field} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name={`email-${user.id}`}
                    control={control}
                    defaultValue={user.email}
                    render={({ field }) => (
                      <Input {...field} />
                    )}
                  />
                </Td>
                <Td>
                  <Controller
                    name={`role-${user.id}`}
                    control={control}
                    defaultValue={user.role === "ADMIN" ? "1" : "0"}
                    render={({ field }) => (
                      <Select {...field}>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                      </Select>
                    )}
                  />
                </Td>
                <Td>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                  >
                    Update
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }