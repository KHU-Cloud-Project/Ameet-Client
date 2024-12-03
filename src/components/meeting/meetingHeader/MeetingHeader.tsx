// /** @jsxImportSource @emotion/react */
// import styled from '@emotion/styled';
// import { Spacer } from '../../common/Spacer';
// import { theme } from '../../../styles/theme';
// import CuttedLogo from './CuttedLogo';
// import BoardTitle from '../../common/board/BoardTitle';
// import { User } from '../../../recoil/atoms/userAtom';

// type HeaderProps = {
//   title: string;
//   hasSearchbar: boolean;
//   user: User;
// };

// const HeaderContainer = styled.div`
//   display: flex;
//   // flex-shrink: 0;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px 24px;
//   background-color: ${(props) => props.theme.colors.white};
//   // border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
// `;

// const HeaderRightSideWrapper = styled.div`
//   display: flex;
// `;

// const SearchBar = styled.div`
//   max-width: 480px;
//   flex: 1;
//   display: flex;
//   align-items: center;
//   background-color: ${(props) => props.theme.colors.darkWhite};
//   padding: 12px 22px;
//   border-radius: ${(props) => props.theme.borderRadius.medium};
// `;

// const SearchIcon = styled.span`
//   margin-right: 8px;
//   color: ${(props) => props.theme.colors.secondary};
// `;

// const SearchInput = styled.input`
//   border: none;
//   background: transparent;
//   font-size: ${(props) => props.theme.typography.fontSize.medium};
//   color: ${(props) => props.theme.colors.textBlack};

//   &:focus {
//     outline: none;
//   }
// `;

// const LanguageSelector = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   color: ${(props) => props.theme.colors.textBlack};
// `;

// const LanguageFlag = styled.span`
//   font-size: ${(props) => props.theme.typography.fontSize.large};
// `;

// const NotificationIcon = styled.div`
//   margin-left: 20px;
//   font-size: ${(props) => props.theme.typography.fontSize.large};
//   position: relative;
//   cursor: pointer;
// `;

// const NotificationDot = styled.span`
//   position: absolute;
//   top: 0;
//   right: 0;
//   background-color: ${(props) => props.theme.colors.red};
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
// `;

// const ProfileArea = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-left: 20px;
// `;

// const ProfileImage = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
// `;

// const ProfileName = styled.div`
//   font-size: ${(props) => props.theme.typography.fontSize.medium};
//   color: ${(props) => props.theme.colors.textBlack};
// `;

// const ProfileRole = styled.div`
//   font-size: ${(props) => props.theme.typography.fontSize.small};
//   color: ${(props) => props.theme.colors.primary};
// `;

// function MeetingHeader({ title, hasSearchbar, user }: HeaderProps) {
//   return (
//     <HeaderContainer>
//       <CuttedLogo />
//       <BoardTitle
//         children={title}
//         fontSize={theme.typography.fontSize.xLarge}
//         marginBottom={0}
//       />
//       {hasSearchbar && (
//         <SearchBar>
//           <SearchIcon>🔍</SearchIcon>
//           <SearchInput type="text" placeholder="Search for meeting logs" />
//         </SearchBar>
//       )}
//       <HeaderRightSideWrapper>
//         <LanguageSelector>
//           <LanguageFlag>🇺🇸</LanguageFlag>
//           <span>Eng (US)</span>
//         </LanguageSelector>
//         <Spacer width={30} />
//         <NotificationIcon>
//           🔔
//           <NotificationDot />
//         </NotificationIcon>
//         <Spacer width={18} />
//         <ProfileArea>
//           <ProfileImage src={user.profile ?? ''} alt="Profile" />
//           {/* 프로필 사진 없는 경우 /src/assets/images/profile.png 보여지게 해야 함 - ProfileArea.tsx, MemberBlock.tsx 참고*/}
//           <div>
//             <ProfileName>{user.nickname}</ProfileName>
//             <ProfileRole>{user.role}</ProfileRole>
//           </div>
//         </ProfileArea>
//       </HeaderRightSideWrapper>
//     </HeaderContainer>
//   );
// }

// export default MeetingHeader;
