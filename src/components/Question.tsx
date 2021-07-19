import { ReactNode } from "react";

import cn from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children: ReactNode,
  isHighLight: boolean,
  isAnswered: boolean,
}

export function Question({ content, author, children, isHighLight, isAnswered }: QuestionProps) {
  return (
    <div className={cn(
      'question', 
      { answered: isAnswered },
      { highlighted: isHighLight && !isAnswered},
      )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}
        </div>
      </footer>
    </div>
  );
}