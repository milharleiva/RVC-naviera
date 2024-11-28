import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

const backend = defineBackend({
  auth, 
  data, 
});

backend.addOutput({
  storage: {
    aws_region: "us-west-1",
    bucket_name: "public",
  },
});