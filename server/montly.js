
export const getMonthlyTotal = async (req, res) => {
  try {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear() + 1, now.getMonth() + 1, 0);
    const list = await Invoice.find({
      date: { $gte: firstDay, $lte: lastDay },
    });

    // TOTAL OF expense IN A DAY
    const total = list.map((a) => a.amount);
    const result = total.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
