import Button from "@/components/Button";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount
} from "wagmi";

import abi from "../abi";

import { dividendTokenAddress } from "@/utils/config";

import Notification from "@/components/Notification";
import { useEffect } from "react";

type DividendClaimButtonProps = {
  refetch: () => void;
  disabled?: boolean;
};

export default function DividendClaimButton({ refetch, disabled }: DividendClaimButtonProps) {

  const { address, isConnecting, isDisconnected } = useAccount();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: dividendTokenAddress,
    abi: abi,
    functionName:"claim",
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
    <Button
      className="relative text-center !border-0 button !duration-[1500ms]"
      variant="empty"
      size="ball"
      disabled={!write || disabled}
      onClick={() => onClick()}
      loading={isLoading}
    >
      <p className="text-4xl">CLAIM</p>
    </Button>
  );
}
