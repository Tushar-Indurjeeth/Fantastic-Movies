const addCard = async ({ name, surname, pos, idList }) =>
  await (
    await fetch(
      `https://api.trello.com/1/cards?key=${process.env.REACT_APP_TRELLO_API_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}&name=${name} ${surname}&pos=${pos}&customFieldItems=true&idList=${idList}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
  ).json();

const addCustomFieldData = async ({ data, cardId, field }) => {
  const userData = { value: { text: data } };

  await (
    await fetch(
      `https://api.trello.com/1/card/${cardId}/customField/${field}/item?token=${process.env.REACT_APP_TRELLO_TOKEN}&key=${process.env.REACT_APP_TRELLO_API_KEY}`,
      {
        body: JSON.stringify(userData),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  ).json();
};

export { addCard, addCustomFieldData };
