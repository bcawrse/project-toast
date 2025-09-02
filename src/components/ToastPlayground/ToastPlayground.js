import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import Toast, { VARIANT_OPTIONS } from "../Toast";

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = React.useState([]);

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleVariantChange(e) {
    setVariant(e.target.value);
  }

  function handleAddToast({ variant, message }) {
    if (message == null || message === "") return;

    setToasts((currToasts) => [
      ...currToasts,
      { variant, message, id: window.crypto.randomUUID() },
    ]);
  }

  function removeToast(id) {
    const newToasts = toasts.filter((t) => t.id !== id);
    setToasts(newToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toasts.map(({ id, variant, message }) => (
        <Toast
          key={id}
          variant={variant}
          message={message}
          onClose={() => removeToast(id)}
        />
      ))}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              onChange={handleMessageChange}
              value={message}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => (
              <label key={variantOption} htmlFor={`variant-${variantOption}`}>
                <input
                  id={`variant-${variantOption}`}
                  type="radio"
                  name="variant"
                  checked={variant === variantOption}
                  onChange={handleVariantChange}
                  value={variantOption}
                />
                {variantOption}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => handleAddToast({ variant, message })}>
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
