/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Header from '../../dashboard/header/Header';

function Dashboard() {
    const dummyHasSearchbar = true;
    const dummyIsAdmin = true;
  
    const handleRemoveMember = (nickname: string) => {
      console.log(`Remove member: ${nickname}`);
    };
  
    return (
      <>
        <Header
          title={dummyTitle}
          hasSearchbar={dummyHasSearchbar}
          user={dummyUser}
        />
      </>
    );
  }
  
  export default Dashboard;
  
  const dummyTitle = 'Space 1';
  const dummyUser = {
    name: 'Cherrie',
    role: 'Member',
    profileImage: 'https://picsum.photos/200',
  };
  
  const dummyMembers = [
    {
      imageUrl: 'https://picsum.photos/201',
      nickname: 'Sumin',
      authority: 'Admin',
      introduction: 'I love cloud ☁️ 🌹💘💘',
    },
    {
      imageUrl: 'https://picsum.photos/202',
      nickname: 'SaY',
      authority: 'Member',
      introduction: 'backend developer',
    },
    {
      imageUrl: 'https://picsum.photos/203',
      nickname: 'Cherrie',
      authority: 'Member',
      introduction: 'Sujin so cute',
    },
    {
      imageUrl: 'https://picsum.photos/204',
      nickname: 'Sujin',
      authority: 'Member',
      introduction: 'I AM MZ',
    },
    {
      imageUrl: 'https://picsum.photos/205',
      nickname: 'Gyeongtaek',
      authority: 'Member',
      introduction: 'I AM ZM',
    },
  ];
  