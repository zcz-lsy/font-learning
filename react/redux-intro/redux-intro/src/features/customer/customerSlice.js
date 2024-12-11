import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID, createAt) {
        return {
          payload: {
            fullName,
            nationalID,
            createAt,
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;

export const { createCustomer, updateName } = customerSlice.actions;

// export default function customerReducer(state = initialCustormerState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payLoad.fullName,
//         nationalID: action.payLoad.nationalID,
//         createdAt: action.payLoad.createdAt,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payLoad.fullName,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   console.log(fullName);
//   return {
//     type: "customer/createCustomer",
//     payLoad: {
//       fullName: fullName,
//       nationalID: nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: "account/updateName",
//     payLoad: fullName,
//   };
// }
