import Button from "@/components/Button";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import abi from "../abi";

import { nftAddress1, rewardsInTokens } from "@/utils/config";

import Notification from "@/components/Notification";
import { useEffect } from "react";

type ClaimButtonProps = {
  refetch: () => void;
  disabled?: boolean;
};

export default function ClaimButton({ refetch, disabled }: ClaimButtonProps) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: nftAddress1,
    abi: abi,
    functionName: rewardsInTokens ? "claimRewardsTokens" : "claimRewards",
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
      className="relative text-center"
      color="primary"
      fullWidth
      disabled={!write || disabled}
      onClick={() => onClick()}
      loading={isLoading}
    >
      Claim
    </Button>
  );
}
