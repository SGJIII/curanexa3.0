const sendEvent = (action, category, label, value) => {
  window.gtag &&
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
};

export default sendEvent;
