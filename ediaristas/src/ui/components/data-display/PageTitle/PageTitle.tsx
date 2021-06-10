import React from "react";
import { PageTitleContainer } from "./PageTitle.style";
import { PageTitleStyled } from "./PageTitle.style";
import { PageSubtitleStyled } from "./PageTitle.style";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <PageTitleContainer>
      <PageTitleStyled>{props.title}</PageTitleStyled>
      <PageSubtitleStyled>{props.subtitle}</PageSubtitleStyled>
    </PageTitleContainer>
  );
};

export default PageTitle;
