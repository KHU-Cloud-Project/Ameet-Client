/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Dashboard() {
  return (
    <div css={dashboardContainer}>
      <aside css={leftPanel}>Dashboard Left Panel (fixed open)</aside>
      <header css={header}>Dashboard Header</header>
      <main css={mainContent}>
        <section css={block1}>Block 1 (horizontally scrollable)</section>
        <section css={block2}>Block 2</section>
        <section css={block3}>Block 3</section>
      </main>
    </div>
  );
}

export default Dashboard;

const dashboardContainer = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  background-color: #e0e0e0; /* Light gray background */
`;

const leftPanel = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #ff8a80; /* Pink color for the left panel */
  padding: 16px;
  box-sizing: border-box;
`;

const header = css`
  position: fixed;
  top: 0;
  left: 200px; /* Aligns with left panel width */
  right: 0;
  height: 60px;
  background-color: #66bb6a; /* Green color for the header */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const mainContent = css`
  margin-left: 200px; /* Offset for the left panel */
  margin-top: 60px; /* Offset for the header */
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: auto 1fr;
  gap: 16px;
  height: calc(100vh - 60px); /* Fill the remaining height */
  overflow: auto;
`;

const block1 = css`
  background-color: #fff59d; /* Yellow color */
  padding: 16px;
  border-radius: 8px;
  grid-column: span 2;
  overflow-x: auto;
  white-space: nowrap;
`;

const block2 = css`
  background-color: #80deea; /* Light blue color */
  padding: 16px;
  border-radius: 8px;
`;

const block3 = css`
  background-color: #b39ddb; /* Purple color */
  padding: 16px;
  border-radius: 8px;
`;

// import { useNavigate } from 'react-router';
// import { Spacer } from '../components/common/Spacer';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleBtnClick = () => {
//     navigate('/login');
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>Dashboard Page</h2>
//       <Spacer height={30} />
//       <button onClick={handleBtnClick}>로그인 페이지로 이동</button>
//     </div>
//   );
// };

// export default Dashboard;
