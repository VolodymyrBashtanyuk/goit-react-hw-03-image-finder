import PropTypes from 'prop-types';
import { Wrapper, TitleWrapper } from './SectionStyle';

export const Section = ({ title, children }) => {
  return (
    <Wrapper>
      <TitleWrapper>{title}</TitleWrapper>
      {children}
    </Wrapper>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
};
