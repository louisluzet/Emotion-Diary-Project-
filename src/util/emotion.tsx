export type emotionListProps = {
    emotion_id: number;
    emotion_img: string;
    emotion_descript: string;
  };
  
export const emotionList: emotionListProps[] = [
    {
      emotion_id: 1,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
      emotion_descript: "HAPPY",
    },
    {
      emotion_id: 2,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
      emotion_descript: "GOOD",
    },
    {
      emotion_id: 3,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
      emotion_descript: "NOT BAD",
    },
    {
      emotion_id: 4,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
      emotion_descript: "BAD",
    },
    {
      emotion_id: 5,
      emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
      emotion_descript: "ANGLY",
    },
  ];