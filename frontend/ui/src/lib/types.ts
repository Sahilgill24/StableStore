// export interface Project {
//     name: string,
//     clientSecret: string,
//     id:Number,
//     description: string,
//     createdAt: Date,
//     appId: string,
// }

// export interface SideNavState {
//     label: string;
//     icon: any;
//     component?: JSX.Element;
//     href?: string;
// }

export interface Deal {
    id: number;
    client: string;
    pieceSize: string;
    storageFee: BigInt;
    status: "pending" | "success";
    startEpoch: string;
    endEpoch: string;
}

export interface Message {
    label: string;
    pieceCID: string;
    client: string;
    startEpoch: string;
    endEpoch: string;
    providerCollateral: string;
    clientCollateral: string;
    storagePricePerEpoch: string;
}
