use cosmwasm_std::{
    entry_point, to_json_binary, DepsMut, Env, MessageInfo, Response, StdResult, WasmMsg,
};

use crate::msg::{ExecuteMsg, InstantiateMsg, ProofMsg};
use crate::state::{Config, CONFIG};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let config = Config {
        contract: msg.contract,
    };

    CONFIG.save(deps.storage, &config)?;

    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    let config = CONFIG.load(deps.storage)?;

    match msg {
        ExecuteMsg::VerifyProof(msg) => verify_proof(deps, env, config.contract, msg),
    }
}

pub fn verify_proof(
    _deps: DepsMut,
    _env: Env,
    contract: String,
    msg: ProofMsg,
) -> StdResult<Response> {
    let exec_msg = ExecuteMsg::VerifyProof(msg);

    let cosmos_msg = WasmMsg::Execute {
        contract_addr: contract,
        msg: to_json_binary(&exec_msg)?,
        funds: vec![],
    };

    Ok(Response::new()
        .add_message(cosmos_msg)
        .add_attribute("action", "verify"))
}
