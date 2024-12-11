export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list!</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const perPacked = (numPacked / numItems) * 100;

  return (
    <footer class="stats">
      <em>
        {perPacked === 100
          ? "You get everything! Ready to go!"
          : `💼 You have ${numItems} items on your list, and you already paked
          ${numPacked} (${perPacked.toFixed(2)}%)`}
      </em>
    </footer>
  );
}
