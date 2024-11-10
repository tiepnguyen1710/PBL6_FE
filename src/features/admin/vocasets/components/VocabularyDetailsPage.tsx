import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { useParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MOCK_VOCABULARIES from "../../../../utils/mockVocabularies";
import RoundedFileInput from "./RoundedFileInput";
import VocabularyCardWrapper from "./VocabularyCardWrapper";
import VocabularyFrontSide from "./VocabularyFrontSide";
import { useState } from "react";
import VocabularyBackSide from "./VocabularyBackSide";

interface VocaFormData {
  word: string;
  phonetic: string;
  phoneticAudio?: string;
  definition: string;
  type: string;
  meaning: string;

  image?: string;
  exampleAudio?: string;
  example?: string;
  exampleMeaning?: string;
}

type MediaFileSrcs = {
  imageSrc: string;
  phoneticAudioSrc: string;
  exampleAudioSrc: string;
};

const validationRules = {
  word: {
    required: "Word is required",
  },
  type: {
    required: "Type is required",
  },
  phonetic: {
    required: "Phonetic is required",
  },
  definition: {
    required: "Definition is required",
  },
  meaning: {
    required: "Meaning is required",
  },
  example: {
    required: "Example is required",
  },
  exampleMeaning: {
    required: "Example meaning is required",
  },

  // Sau này tính tiếp, validatio cho file input, 2 th: trường hợp có defaultFileSrc (get), và th tạo mới
  // phoneticAudio: {
  //   required: "Phonetic audio is required",
  // },
  // exampleAudio: {
  //   required: "Example audio is required",
  // },
};

const VocabularyDetailsPage = () => {
  // Mock get vocabulary by id
  const routeParams = useParams<{ vocaId: string }>();
  const vocaId = routeParams.vocaId;
  const voca = MOCK_VOCABULARIES.find((voca) => voca.id === vocaId);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VocaFormData>({
    defaultValues: {
      word: voca?.word,
      phonetic: voca?.phonetic,
      definition: voca?.definition,
      type: voca?.type,
      meaning: voca?.meaning,
      example: voca?.example,
      exampleMeaning: voca?.exampleMeaning,
    },
  });

  const [wordInput, typeInput, phoneticInput, meaningInput] = watch([
    "word",
    "type",
    "phonetic",
    "meaning",
  ]);

  const [mediaInput, setMediaInput] = useState<MediaFileSrcs>({
    imageSrc: voca?.image || "",
    phoneticAudioSrc: voca?.phoneticAudio || "",
    exampleAudioSrc: voca?.exampleAudio || "",
  });

  console.log("Validation errors:", errors);

  const handleSaveForm: SubmitHandler<VocaFormData> = (data) => {
    console.log("Form data:", data);
  };

  const handleChangeMediaInput = (type: keyof MediaFileSrcs, src: string) => {
    setMediaInput((prev) => ({ ...prev, [type]: src }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Vocabulary Details
        </Typography>
        <GoBackButton />
      </Stack>

      <Stack direction="row" spacing={4}>
        <form
          id="details-voca-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleSubmit(handleSaveForm)}
        >
          <Stack direction="row" spacing={2} alignItems="start">
            <Grid2 spacing={1} container sx={{ maxWidth: "600px" }}>
              <Grid2 size={12}>
                <Controller
                  name="word"
                  control={control}
                  rules={validationRules.word}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Word"
                      placeholder="Enter the lesson name"
                      padding="16.5px 14px"
                      borderRadius={4}
                      gap={0.5}
                      requiredSign
                      validationError={errors.word?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={4}>
                <Controller
                  name="type"
                  control={control}
                  rules={validationRules.type}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Type"
                      padding="16.5px 14px"
                      borderRadius={4}
                      gap={0.5}
                      requiredSign
                      validationError={errors.type?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={8}>
                <RoundedFileInput
                  register={register("image")}
                  label="Image"
                  borderRadius={4}
                  gap={0.5}
                  padding="16.5px 14px"
                  requiredSign
                  iconButton={<AddPhotoAlternate />}
                  defaultFileSrc={voca?.image}
                  onChangeFile={(newFileSrc) =>
                    handleChangeMediaInput("imageSrc", newFileSrc)
                  }
                />
              </Grid2>

              <Grid2 size={12}>
                <Controller
                  name="meaning"
                  control={control}
                  rules={validationRules.meaning}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Meaning"
                      borderRadius={4}
                      gap={0.5}
                      padding="16.5px 14px"
                      requiredSign
                      validationError={errors.meaning?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={4}>
                <Controller
                  name="phonetic"
                  control={control}
                  rules={validationRules.phonetic}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Phonetic"
                      borderRadius={4}
                      gap={0.5}
                      padding="16.5px 14px"
                      requiredSign
                      validationError={errors.phonetic?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={8}>
                <RoundedFileInput
                  register={register("phoneticAudio")}
                  label="Phonetic Audio"
                  borderRadius={4}
                  gap={0.5}
                  padding="16.5px 14px"
                  defaultFileSrc={voca?.phoneticAudio}
                  onChangeFile={(newFileSrc) =>
                    handleChangeMediaInput("phoneticAudioSrc", newFileSrc)
                  }
                />
              </Grid2>

              <Grid2 size={12}>
                <Controller
                  name="definition"
                  control={control}
                  rules={validationRules.definition}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Definition"
                      borderRadius={4}
                      gap={0.5}
                      padding="16.5px 14px"
                      multiline
                      rows={2}
                      requiredSign
                      validationError={errors.definition?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={12}>
                <Controller
                  name="example"
                  control={control}
                  rules={validationRules.example}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Example"
                      borderRadius={4}
                      gap={0.5}
                      padding="16.5px 14px"
                      multiline
                      rows={2}
                      requiredSign
                      validationError={errors.example?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={12}>
                <RoundedFileInput
                  register={register("exampleAudio")}
                  label="Example Audio"
                  borderRadius={4}
                  gap={0.5}
                  padding="16.5px 14px"
                  defaultFileSrc={voca?.exampleAudio}
                  onChangeFile={(newFileSrc) =>
                    handleChangeMediaInput("exampleAudioSrc", newFileSrc)
                  }
                />
              </Grid2>

              <Grid2 size={12}>
                <Controller
                  name="exampleMeaning"
                  control={control}
                  rules={validationRules.exampleMeaning}
                  render={({ field }) => (
                    <RoundedInput
                      {...field}
                      label="Example Meaning"
                      borderRadius={4}
                      gap={0.5}
                      padding="16.5px 14px"
                      multiline
                      rows={2}
                      requiredSign
                      validationError={errors.exampleMeaning?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={12}>
                <Stack direction="row" spacing={0.5} justifyContent="end">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ float: "right", px: "24px", minWidth: "110px" }}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid2>
            </Grid2>
          </Stack>
        </form>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Stack spacing={2}>
          <Stack direction="row" spacing={3}>
            <VocabularyCardWrapper>
              <VocabularyFrontSide
                word={wordInput}
                phonetic={phoneticInput}
                image={mediaInput.imageSrc}
              />
            </VocabularyCardWrapper>
            <VocabularyCardWrapper>
              <VocabularyBackSide type={typeInput} meaning={meaningInput} />
            </VocabularyCardWrapper>
          </Stack>

          <Stack spacing={0.5}>
            <Typography>Phonetic Audio Preview</Typography>
            <audio src={mediaInput.phoneticAudioSrc} controls />
          </Stack>
          <Stack spacing={0.5}>
            <Typography>Example Audio Preview</Typography>
            <audio src={mediaInput.exampleAudioSrc} controls />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default VocabularyDetailsPage;
