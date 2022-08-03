# Commands tests lambdas

> doc => https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-invoke.html

- `sam local invoke` = test local
- `getUserFunction29C5D011` = example ID lambda
- `-n` = --env-vars (enviroment mock)
- `-e` = --event (event data mock)

#### addUser

    sam local invoke useraddUserFunction4AD4C829 -e backend/main/sample_events/user/addUser.json -n backend/main/sample_events/envs/env.json

#### updateUser

    sam local invoke userupdateUserFunction28537107 -e backend/main/sample_events/user/updateUser.json -n backend/main/sample_events/envs/env.json

#### getUser

    sam local invoke usergetUserFunction56EA507D -e backend/main/sample_events/user/getUser.json -n backend/main/sample_events/envs/env.json

#### addAddress

    sam local invoke useraddAddressFunction0990823E -e backend/main/sample_events/user/addAddress.json -n backend/main/sample_events/envs/env.json

#### updateAddress

    sam local invoke userupdateAddressFunctionA24FE060 -e backend/main/sample_events/user/updateAddress.json -n backend/main/sample_events/envs/env.json

#### getAddresses

    sam local invoke usergetAddressesFunctionE9EFF721 -e backend/main/sample_events/user/getAddresses.json -n backend/main/sample_events/envs/env.json

#### listProfiles

    sam local invoke adminlistProfilesFunction66407277 -e backend/main/sample_events/admin/listProfiles.json -n backend/main/sample_events/envs/env.json

#### listProfiles

    sam local invoke adminlistPermissionsFunction287CBE36 -e backend/main/sample_events/admin/listPermissions.json -n backend/main/sample_events/envs/env.json

#### manageProfilePermissions

    sam local invoke adminmanageProfilePermissionsFunction53E6E4C6 -e backend/main/sample_events/admin/manageProfilePermissions.json -n backend/main/sample_events/envs/env.json

#### listProfilePermissions

    sam local invoke adminlistProfilePermissionsFunctionB9353F88 -e backend/main/sample_events/admin/listProfilePermissions.json -n backend/main/sample_events/envs/env.json

#### addAccount

    sam local invoke adminaddAccountFunctionA17F5D03 -e backend/main/sample_events/admin/addAccount.json -n backend/main/sample_events/envs/env.json

#### updateAccount

    sam local invoke adminupdateAccountFunctionC5ED0F5C -e backend/main/sample_events/admin/updateAccount.json -n backend/main/sample_events/envs/env.json

#### deleteAccount

    sam local invoke admindeleteAccountFunctionE9A5F4DE -e backend/main/sample_events/admin/deleteAccount.json -n backend/main/sample_events/envs/env.json

#### listAccounts

    sam local invoke adminlistAccountsFunction471076D8 -e backend/main/sample_events/admin/listAccounts.json -n backend/main/sample_events/envs/env.json

#### countPagesAccounts

    sam local invoke admincountPagesAccountsFunction74AAA275 -e backend/main/sample_events/admin/countPagesAccounts.json -n backend/main/sample_events/envs/env.json

#### manageAccountLinkedUsers

    sam local invoke adminmanageAccountLinkedUsersFunctionE99156FF -e backend/main/sample_events/admin/manageAccountLinkedUsers.json -n backend/main/sample_events/envs/env.json

#### listAccountLinkedUsers

    sam local invoke adminlistAccountLinkedUsersFunctionF5D69ABB -e backend/main/sample_events/admin/listAccountLinkedUsers.json -n backend/main/sample_events/envs/env.json

#### countPagesUsers

    sam local invoke admincountPagesUsersFunctionBEC62427 -e backend/main/sample_events/admin/countPagesUsers.json -n backend/main/sample_events/envs/env.json
