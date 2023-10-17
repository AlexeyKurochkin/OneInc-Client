import EncodedStringRenderer from "./EncodedStringRenderer";

export default {
  title: "Components/EncodedStringRenderer",
  component: EncodedStringRenderer,
  tags: ["autodocs"],
};

export const Default = {
  args: {
    isEncoding: false,
    encodedValue: "",
  },
};

export const Encoding = {
  args: {
    isEncoding: true,
    encodedValue: btoa("This is encoded string"),
  },
};
