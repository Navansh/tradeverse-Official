
 const getBalance = async (account: string | undefined) => {
    const res = await fetch(
      "https://polygon-mumbai.blockpi.network/v1/rpc/1765140f9abdd58481722479f70afdf328209c55",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [account, "latest"],
          id: 1,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        return data.result;
        // Handle the response data here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
  };

  export const getGasPrice = async () => {
    const res = await fetch(
      "https://polygon-mumbai.blockpi.network/v1/rpc/66aaf318663ab49c3eddd375ef85e7848b00d5fc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_gasPrice",
          params: [],
          id: 1,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        return data.result;
        // Handle the response data here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors here
      });
  };

  export {
    getBalance
  }