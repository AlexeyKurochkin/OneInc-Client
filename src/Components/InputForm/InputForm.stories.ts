import InputForm from "./InputForm";
import { action } from "@storybook/addon-actions";

const handleSubmitAction = action("onSubmit");
const handleCancelAction = action("onCancel");

export default {
  title: "Components/InputForm",
  component: InputForm,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    isEncoding: false,
    onSubmit: handleSubmitAction,
    onCancel: handleCancelAction,
  },
};

export const Encoding = {
  args: {
    isEncoding: true,
    onSubmit: handleSubmitAction,
    onCancel: handleCancelAction,
  },
};
