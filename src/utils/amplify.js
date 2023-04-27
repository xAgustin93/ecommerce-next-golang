import { Amplify } from "aws-amplify";

export function initAmplify() {
  Amplify.configure({
    aws_cognito_region: "us-east-1",
    aws_user_pools_id: "us-east-1_ln0bNuRBv",
    aws_user_pools_web_client_id: "7hl618nmvpnoake3sr290dttah",
    aws_cognito_identity_pool_id:
      "us-east-1:ece7f0c6-006a-4394-9a3e-1b27e41e07a1",
  });
}
