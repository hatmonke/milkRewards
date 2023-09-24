import Button from "@/components/Button";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { nftAddress1 } from "@/utils/config";

import Notification from "@/components/Notification";
import { useEffect } from "react";

type MintButtonProps = {
  refetch: () => void;
  cost: number;
  amount: number;
  disabled?: boolean;
};

export default function MintButton({
  cost,
  amount,
  refetch,
  disabled,
}: MintButtonProps) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: nftAddress1,
    abi: [
      {
        name: "mint",
        type: "function",
        stateMutability: "payable",
        inputs: [
          {
            type: "uint256",
            name: "_mintAmount",
          },
        ],
        outputs: [],
      },
    ],
    functionName: "mint",
    value: BigInt(cost * amount),
    args: [amount],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function onClick() {
    if (!write) return;
    write();
  }

  function OnWriteError() {
    if (!error) return;
    console.log(error);
    Notification({
      success: false,
      title: "Error",
      message: `${error?.message}`,
    });
  }

  function OnWriteSuccess() {
    if (!isSuccess) return;
    Notification({
      success: true,
      title: "Success",
      message: `Successfully Voted!`,
    });
    refetch();
  }

  useEffect(() => {
    OnWriteSuccess();
  }, [isSuccess]);

  useEffect(() => {
    OnWriteError();
  }, [error]);

  return (
    <div className="flex items-center justify-center w-full">
      <Button
        className="relative text-center"
        color="neutral"
        fullWidth
        disabled={!write || disabled}
        onClick={() => onClick()}
        loading={isLoading}
      >
        Mint
      </Button>
    </div>
  );
}
