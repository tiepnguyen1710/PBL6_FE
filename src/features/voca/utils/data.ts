import VocaSetInfo from "../types/VocaSetInfo.ts";
import Vocabulary from "../types/Vocabulary.ts";

export const mockVocaSets: VocaSetInfo[] = [
  {
    id: "2",
    title: "500 Essential Words for TOEFL - Intermediate English",
    qualification: "intermediate",
    topic: "Chemistry",
    author: "Jane Smith",
    takenNumber: "1.8m",
  },
  {
    id: "3",
    title: "300 Basic Words for TOEFL - Beginner English",
    qualification: "beginner",
    topic: "General Science",
    author: "Alex Johnson",
    takenNumber: "1.2m",
  },
  {
    id: "4",
    title: "600 Advanced Words for TOEFL - Advanced English",
    qualification: "advanced",
    topic: "Physics",
    author: "Emily Davis",
    takenNumber: "3.5m",
    image:
      "https://www.voca.vn/assets/file_upload/images/english-words-for-advanced-1621595875.jpg",
  },
  {
    id: "5",
    title: "450 Key Vocabulary Words for TOEFL - Intermediate English",
    qualification: "intermediate",
    topic: "Economics",
    author: "Michael Brown",
    takenNumber: "2.3m",
  },
  {
    id: "6",
    title: "350 TOEFL Words - Beginner Level",
    qualification: "beginner",
    topic: "Mathematics",
    author: "Olivia Green",
    takenNumber: "1.0m",
    image:
      "https://www.voca.vn/assets/file_upload/images/english-words-for-starter-1621594978.jpg",
  },
  {
    id: "7",
    title: "Advanced Vocabulary for TOEFL - 700 Words",
    qualification: "advanced",
    topic: "Literature",
    author: "Lucas White",
    takenNumber: "3.8m",
  },
  {
    id: "8",
    title: "Intermediate Vocabulary for TOEFL - 400 Words",
    qualification: "intermediate",
    topic: "History",
    author: "Sophia Black",
    takenNumber: "2.0m",
    image:
      "https://www.voca.vn/assets/file_upload/images/english-words-for-pre-intermediate-1621595904.jpg",
  },
  {
    id: "9",
    title: "200 Foundation Words for TOEFL - Beginner",
    qualification: "beginner",
    topic: "Science",
    author: "James Lee",
    takenNumber: "900k",
    image:
      "https://www.voca.vn/assets/file_upload/images/3000-smart-words-1622106085.jpg",
  },
  {
    id: "10",
    title: "500 Advanced TOEFL Vocabulary - Expert Level",
    qualification: "advanced",
    topic: "Geography",
    author: "Isabella Scott",
    takenNumber: "2.9m",
    image:
      "https://www.voca.vn/assets/file_upload/images/1000-smart-words-in-topics-no1-avatar-1622106063.jpg",
  },
  {
    id: "11",
    title: "Core 450 Words for TOEFL - Intermediate",
    qualification: "intermediate",
    topic: "Business Studies",
    author: "Ethan Brown",
    takenNumber: "1.7m",
    image:
      "https://www.voca.vn/assets/file_upload/images/english-words-for-intermediate-1621595795.jpg",
  },
  {
    id: "12",
    title: "700 Comprehensive Words for TOEFL - Advanced",
    qualification: "advanced",
    topic: "Engineering",
    author: "Mia Wilson",
    takenNumber: "3.6m",
  },
  {
    id: "13",
    title: "Basic TOEFL Vocabulary - 250 Words",
    qualification: "beginner",
    topic: "Art",
    author: "David Johnson",
    takenNumber: "800k",
  },
  {
    id: "14",
    title: "Intermediate TOEFL Words - 350 Essential Vocabulary",
    qualification: "intermediate",
    topic: "Computer Science",
    author: "Emma Thompson",
    takenNumber: "1.5m",
    image:
      "https://www.voca.vn/assets/file_upload/images/english-words-for-upper-intermediate-1621595887.jpg",
  },
  {
    id: "15",
    title: "800 Words for TOEFL Mastery - Advanced Level",
    qualification: "advanced",
    topic: "Medicine",
    author: "Ava Martinez",
    takenNumber: "4.0m",
  },
];

export const mockVocabularies: Vocabulary[] = [
  {
    id: "1",
    word: "accountant",
    meaning: "kế toán viên",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/accountant%20%283%29.jpg",
    type: "n",
    definition: "a person whose job is to keep or check financial accounts",
    phonetic: "/əˈkaʊntənt/",
    phoneticAudio:
      "https://www.voca.vn/assets/sounds/cg44dbx4srwzhlezrjskqaubkg25k2as3qjconqqk2q.mp3",
    example: "Her husband is an accountant of her company.",
    exampleMeaning: "Người chồng chính là kế toán viên của công ty cô ta.",
    exampleAudio:
      "https://www.voca.vn/assets/sounds/samples/0jloj1uugdnp5dvcpoxiw9503kucjx65m3prpee.mp3",
  },
  {
    id: "2",
    word: "actor",
    meaning: "nam diễn viên",
    image: "https://www.voca.vn/assets/assets-v2/img/library/actor (4).jpg",
    type: "n",
    definition:
      "a man who performs on the stage, on television or in films, especially as a profession",
    phonetic: "/ˈæktər/",
    phoneticAudio:
      "https://www.voca.vn/assets/sounds/kysdnxgkxxmyl0qj5ytcjubtkda5lzojyb1fysqxe1k.mp3",
    example: "Who's your favourite actor?",
    exampleMeaning: "Nam diễn viên yêu thích của bạn là ai?",
    exampleAudio:
      "https://www.voca.vn/assets/sounds/samples/n01xsrafjlqi0qjc2fbwqmiibir19s5wnesacbmjy.mp3",
  },
  {
    id: "3",
    word: "actress",
    meaning: "nữ diễn viên",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/actress%20%283%29.jpg",
    type: "n",
    definition:
      "a woman who performs on the stage, on television or in films, especially as a profession",
    phonetic: "/ˈæktrəs/",
    phoneticAudio:
      "https://www.voca.vn/assets/sounds/matow4anofbosfgp6onxjnqfmgddqhz42t8621z5nfu.mp3",
    example: "She's the highest-paid actress in Hollywood.",
    exampleMeaning:
      "Cô ấy là nữ diễn viên được trả cát-xê cao nhất ở Hollywood.",
    exampleAudio:
      "https://www.voca.vn/assets/sounds/samples/rq38a9ew28sfb2qnowv18hyembgk9g9bqzsvd5tbzk.mp3",
  },
  {
    id: "4",
    word: "architect",
    meaning: "kiến trúc sư",
    image: "https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg",
    type: "n",
    definition: "a person whose job is designing buildings",
    phonetic: "/ˈɑːrkɪtekt/",
    phoneticAudio:
      "https://www.voca.vn/assets/sounds/q4trjz8alb6a9ip5vavt5nj2uexuvgxj1wm9se6dm7c.mp3",
    example: "He is the architect who planned the new shopping centre.",
    exampleMeaning:
      "Ông ấy là kiến trúc sư thiết kế ra khu trung tâm thương mại mới.",
    exampleAudio:
      "https://www.voca.vn/assets/sounds/samples/8vx5kyy0qlwe7rmqpgfyuvwaozwwnev75gqozvhwow.mp3",
  },
  {
    id: "4",
    word: "architect",
    meaning: "họa sĩ",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/artist%20%284%29.jpg",
    type: "n",
    definition:
      "a person who creates works of art, especially paintings or drawings",
    phonetic: "/ˈɑːrtɪst/",
    phoneticAudio:
      "https://www.voca.vn/assets/sounds/87hpdwbivvhyl30yj97yxlkrxlwkxoufjjlcyldoxuc.mp3",
    example: "Monet is one of my favourite artists.",
    exampleMeaning: "Monet là một trong những họa sĩ yêu thích của tôi.",
    exampleAudio:
      "https://www.voca.vn/assets/sounds/samples/prwdhi9h6itafmmgy0arqiusdti747nokdmwo7jvp3e.mp3",
  },
];
