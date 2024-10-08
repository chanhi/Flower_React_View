import React, { useState, useEffect } from 'react';

// 사용자 관리 페이지 컴포넌트
const Test = () => {
  const [users, setUsers] = useState([]);
  const [loginIdChecked, setLoginIdChecked] = useState({});
  const [nicknameChecked, setNicknameChecked] = useState({});
  const [originalLoginId, setOriginalLoginId] = useState({});
  const [originalNickname, setOriginalNickname] = useState({});

  // 페이지 로딩 시 사용자 데이터 불러오기
  useEffect(() => {
    fetch('http://localhost:8081/api/admin/getuserlist')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        // 초기값 설정
        const initialLoginIds = {};
        const initialNicknames = {};
        const initialLoginIdChecked = {};
        const initialNicknameChecked = {};
        
        data.forEach((user) => {
          initialLoginIds[user.id] = user.loginId;
          initialNicknames[user.id] = user.nickname;
          initialLoginIdChecked[user.id] = false;
          initialNicknameChecked[user.id] = false;
        });
        
        setOriginalLoginId(initialLoginIds);
        setOriginalNickname(initialNicknames);
        setLoginIdChecked(initialLoginIdChecked);
        setNicknameChecked(initialNicknameChecked);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // 로그인 ID 중복 체크 함수
  const checkDuplicateLoginId = (userId) => {
    const loginId = document.getElementById(`loginId-${userId}`).value;

    if (loginId === originalLoginId[userId]) {
      alert('사용가능한 ID입니다.');
      setLoginIdChecked((prevState) => ({ ...prevState, [userId]: true }));
      return;
    }

    fetch(`http://localhost:8081/api/usermanage/check-duplicate?loginId=${encodeURIComponent(loginId)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isDuplicate) {
          alert('이미 사용중인 ID입니다.');
          setLoginIdChecked((prevState) => ({ ...prevState, [userId]: false }));
        } else {
          alert('사용가능한 ID입니다.');
          setLoginIdChecked((prevState) => ({ ...prevState, [userId]: true }));
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // 닉네임 중복 체크 함수
  const checkDuplicateNickname = (userId) => {
    const nickname = document.getElementById(`nickname-${userId}`).value;

    if (nickname === originalNickname[userId]) {
      alert('사용가능한 닉네임입니다.');
      setNicknameChecked((prevState) => ({ ...prevState, [userId]: true }));
      return;
    }

    fetch(`http://localhost:8081/api/usermanage/check-nickname-duplicate?nickname=${encodeURIComponent(nickname)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isDuplicate) {
          alert('사용중인 닉네임입니다.');
          setNicknameChecked((prevState) => ({ ...prevState, [userId]: false }));
        } else {
          alert('사용가능한 닉네임입니다.');
          setNicknameChecked((prevState) => ({ ...prevState, [userId]: true }));
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // 사용자 업데이트 함수
  const updateUser = (userId) => {
    const userForm = {
      id: userId,
      loginId: document.getElementById(`loginId-${userId}`).value,
      password: document.getElementById(`password-${userId}`).value,
      nickname: document.getElementById(`nickname-${userId}`).value,
      name: document.getElementById(`name-${userId}`).value,
      phonenumber: document.getElementById(`phonenumber-${userId}`).value,
      email: document.getElementById(`email-${userId}`).value,
      role: document.getElementById(`role-${userId}`).value,
    };

    fetch('http://localhost:8081/api/admin/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userForm),
    })
      .then((response) => {
        if (response.ok) {
          alert('User updated successfully');
        } else {
          alert('Failed to update user');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Admin User Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login ID</th>
            <th>Password</th>
            <th>Nickname</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <input type="text" id={`loginId-${user.id}`} defaultValue={user.loginId} />
                <button onClick={() => checkDuplicateLoginId(user.id)}>Check</button>
              </td>
              <td><input type="text" id={`password-${user.id}`} defaultValue={user.password} /></td>
              <td>
                <input type="text" id={`nickname-${user.id}`} defaultValue={user.nickname} />
                <button onClick={() => checkDuplicateNickname(user.id)}>Check</button>
              </td>
              <td><input type="text" id={`name-${user.id}`} defaultValue={user.name} /></td>
              <td><input type="text" id={`phonenumber-${user.id}`} defaultValue={user.phonenumber} /></td>
              <td><input type="text" id={`email-${user.id}`} defaultValue={user.email} /></td>
              <td>
                <select id={`role-${user.id}`} defaultValue={user.role === 'ADMIN' ? 1 : 0}>
                  <option value={0}>User</option>
                  <option value={1}>Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => updateUser(user.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
