import { useEffect, useState } from 'react';
import { NftMint } from "../../../mint-solidity/typechain/NftMint";

export const useContractOwner = (
    contract?: NftMint,
    update?: number
): string | undefined => {
    const [ owner, setOwner ] = useState<string | undefined>()
    useEffect(() => {
        if (contract) {
            let stale = false
            void Promise.all([contract?.owner()]).then(([owner_]) => {
                if (!stale) {
                    setOwner(owner_);
                }
            });
            return () => {
              stale = true
              setOwner(undefined)
            }
        }
    }, [contract, update]);
    return owner
}