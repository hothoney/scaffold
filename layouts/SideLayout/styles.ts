import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const LeftContent = styled(motion.div)`
  width: 500px;
  height: 100%;
`;

const LeftContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default {
  LoginWrapper,
  LeftContent,
  LeftContentImage,
};
