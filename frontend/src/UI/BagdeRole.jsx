export const BagdeRole = ({ role }) => {
  const colors = {
    admin: "#FFCDD2",
    employee: "#C8E6C9",
    cashier: "#FFF",
  };

  const colorsDark = {
    admin: "#C62828",
    employee: "#2E7D32",
    cashier: "#000",
  };

  const traslateRole = {
    admin: "Admin",
    employee: "Empleado",
    cashier: "Cajero",
  };

  return (
    <span
      className="px-2.5 py-0.5 text-xs font-medium rounded-full"
      style={{
        backgroundColor: colors[role],
        color: colorsDark[role],
        border: "1px solid " + colorsDark[role],
      }}
    >
      {traslateRole[role]}
    </span>
  );
};
