import { findUserHistory } from '../repositories/historyRepository';

const getHistory = async (userId) => {
  const history = await findUserHistory(userId);

  return history;
};

export { getHistory };
