import React from "react";
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
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPlant, plantAdminUpdate } from "../api"; // 가정된 API 함수

export default function AdminPlant() {
  // 식물 리스트 가져오기
  const { data: plants, isLoading } = useQuery(["getPlantList"], getPlant);

  const plantMutation = useMutation(plantAdminUpdate, {
    onSuccess: () => {
      alert("Plant updated successfully");
    },
    onError: () => {
      alert("Failed to update plant");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const handleUpdate = (plantId) => {
    const ipaddress = document.getElementById(`ipAddressCol-${plantId}`).value;
    const user_id = document.getElementById(`userIdCol-${plantId}`).value;

    const plantData = { id: plantId, ipaddress, user_id };

    // Mutation 실행
    plantMutation.mutate(plantData);
  };

  return (
    <Box>
      <h2>식물 관리 페이지</h2>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>IP Address</Th>
            <Th>User ID</Th>
            <Th>제출</Th>
          </Tr>
        </Thead>
        <Tbody>
          {plants.map((plant) => (
            <Tr key={plant.id}>
              <Td>{plant.id}</Td>
              <Td>
                <Input
                  id={`ipAddressCol-${plant.id}`}
                  defaultValue={plant.ipaddress}
                />
              </Td>
              <Td>
                <Input
                  id={`userIdCol-${plant.id}`}
                  defaultValue={plant.user_id}
                />
              </Td>
              <Td>
                <Button onClick={() => handleUpdate(plant.id)}>Update</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
