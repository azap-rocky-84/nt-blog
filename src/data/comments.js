export const getCommentsData = async () => {
    return [
      {
        _id: "10",
        user: {
          _id: "a",
          name: "Antonio Giorgio",
        },
        desc: "Forza Argentina!",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "11",
        user: {
          _id: "b",
          name: "Paolo Carmine Valletta",
        },
        desc: "Chissà se Messi giocherà...",
        post: "1",
        parent: "10",
        replyOnUser: "a",
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "12",
        user: {
          _id: "b",
          name: "Vincenzo Esposito",
        },
        desc: "Dite quello che volete, ma secondo me il Venezuela può fare grandi cose",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "13",
        user: {
          _id: "c",
          name: "Antonio Taranto",
        },
        desc: "Buon pomeriggio a tutti ragazzi ... e FORZA NAPOLI!💙💙",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
    ];
  };