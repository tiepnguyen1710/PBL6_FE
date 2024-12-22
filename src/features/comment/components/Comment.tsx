import { Avatar, Box, Stack, Typography } from "@mui/material";
import { IComment } from "../types/IComment";
import dayjs from "dayjs";
import { IActiveComment } from "./Comments";

interface CommentProps {
  comment: IComment;
  activeComment?: IActiveComment;
  setActiveComment: (v: IActiveComment) => void;
  addComment: (text: string, parentId: string | null) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  activeComment,
  setActiveComment,
  addComment,
}) => {
  // const isReplying =
  //   activeComment &&
  //   activeComment.id === comment.id &&
  //   activeComment.type === "Replying";
  return (
    <>
      <Box mb={1}>
        <Stack direction="row" gap={1} alignItems="flex-start">
          <Avatar src={comment.user.avatar} />
          <Box>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography sx={{ fontWeight: 600 }}>
                {comment.user.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {dayjs(comment.createdAt).format("DD-MM-YYYY")}
              </Typography>
            </Stack>
            <Typography>{comment.content}</Typography>
            <Typography
              sx={{ fontSize: 11, cursor: "pointer", color: "primary.main" }}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "Replying" })
              }
            >
              Reply
            </Typography>
            {/* {isReplying && (
              <CommentForm
                submitLabel="Reply"
                handleSubmit={(text) => addComment(text, comment.id)}
              />
            )} */}
          </Box>
        </Stack>
        {comment.subComment.length > 0 &&
          comment.subComment.map((sub) => {
            return (
              <Comment
                comment={sub}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
              />
            );
          })}
      </Box>
    </>
  );
};

export default Comment;
