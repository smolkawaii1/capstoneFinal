import { FieldValues } from "react-hook-form";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "components/common/Form";
import { Box } from "@mui/material";

const CreateProject = () => {
  const navigate = useNavigate();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish(data);
  };

  return (
    <Box>
      <Form
        type="Edit"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        onFinishHandler={onFinishHandler}
        handleCSVUpload={function (file: File): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Box>
  );
};

export default CreateProject;
