import { useFetchSignup } from '../../hooks/useFetchSignup';

const DummySignupButton = () => {
  const { signupUser } = useFetchSignup();

  const handleSignup = () => {
    // Dummy data for signup
    const dummyData = {
      email: 'dummyuser@example.com',
      password: 'dummyPassword123',
      nickname: 'dummyUser',
      profile: null,
    };

    signupUser(dummyData)
      .then((response) => {
        console.log('Signup successful:', response);
      })
      .catch((error) => {
        console.error('Signup failed:', error);
      });
  };

  return (
    <div>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default DummySignupButton;
