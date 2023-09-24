import Button from "../Button";
import GradientBorder from "../GradientBorder";

type amountPickerProps = {
  value: number;
  setValue: (value: number) => void;
};

export default function AmountPicker({ value, setValue }: amountPickerProps) {
  function increment() {
    setValue(value + 1);
  }

  function decrement() {
    setValue(value - 1);
  }

  return (
    <GradientBorder>
      <div className="grid items-center justify-center h-full grid-cols-3 gap-2 p-1 text-center bg-basebg rounded-xl w-fit">
        <Button
          className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full"
          onClick={decrement}
          size="ball"
          disabled={value <= 1}
        >
          -
        </Button>
        <p className="text-3xl font-semibold text-contrast">{value}</p>
        <Button
          className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full"
          onClick={increment}
          size="ball"
          disabled={value >= 10}
        >
          +
        </Button>
      </div>
    </GradientBorder>
  );
}
