import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

import {
  NibiruTxClient,
  Chain,
  Mainnet,
  Testnet,
  newSignerFromMnemonic,
} from "@nibiruchain/nibijs";

const contract_wasm = fs.readFileSync("../contract.wasm");

const func = async () => {
  // Uncomment for mainnet
  // const chain: Chain = Mainnet();
  // const reclaim_address = "nibi1d7ffxpewty3zd0lq39l9rxc2wtmgv8j3gsg3qf5yglzewqp84mkqlttmme"

  const chain: Chain = Testnet();
  const reclaim_address = "nibi1l0yhggdxmvkcjd9a304gkel770rkyl2vy272q58seyp5sys7486spversq"
  
  let signer = await newSignerFromMnemonic(process.env.MNEMONIC || ""); 
  let accs = await signer.getAccounts();
  let addr = accs[0].address;

  const txClient = await NibiruTxClient.connectWithSigner(
    chain.endptTm,
    signer
  );

  let storeResp = await txClient.wasmClient.upload(addr, contract_wasm, "auto");
  let codeId = storeResp.codeId;

  let insResponse = await txClient.wasmClient.instantiate(
    addr,
    codeId,
    { contract: reclaim_address },
    "local0.1.0",
    "auto"
  );

  let contractAddress = insResponse.contractAddress;

  console.log("Contract Address: ", contractAddress);
  console.log("Code Id: ", codeId);
  

  const owner = "0xe4c20c9f558160ec08106de300326f7e9c73fb7f";

  const claimInfo = {
    provider: "http",
    parameters:
      '{"body":"","geoLocation":"in","method":"GET","responseMatches":[{"type":"contains","value":"_steamid\\">Steam ID: 76561199632643233</div>"}],"responseRedactions":[{"jsonPath":"","regex":"_steamid\\">Steam ID: (.*)</div>","xPath":"id(\\"responsive_page_template_content\\")/div[@class=\\"page_header_ctn\\"]/div[@class=\\"page_content\\"]/div[@class=\\"youraccount_steamid\\"]"}],"url":"https://store.steampowered.com/account/"}',
    context:
      '{"contextAddress":"user\'s address","contextMessage":"for acmecorp.com on 1st january"}',
  };

  const identifier =
    "0x531322a6c34e5a71296a5ee07af13f0c27b5b1e50616f816374aff6064daaf55";

  const signedClaim = {
    claim: {
      identifier: identifier,
      owner: owner,
      epoch: 1,
      timestampS: 1710157447,
    },
    signatures: [
      "0x52e2a591f51351c1883559f8b6c6264b9cb5984d0b7ccc805078571242166b357994460a1bf8f9903c4130f67d358d7d6e9a52df9a38c51db6a10574b946884c1b",
    ],
  };

  const proof = {
    claimInfo: claimInfo,
    signedClaim: signedClaim,
  };

  await txClient.wasmClient.execute(
    addr,
    contractAddress,
    {
      verify_proof: {
        proof: proof,
      },
    },
    "auto"
  );
};

func();
