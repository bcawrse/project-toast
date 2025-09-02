import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import { VARIANT_OPTIONS } from "../Toast";
import { ToastContext } from "../ToastProvider";
import ToastShelf from "../ToastShelf";

function ToastPlayground() {
  const defaultVariant = VARIANT_OPTIONS[0];
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(defaultVariant);
  const { addToast } = React.useContext(ToastContext);

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleVariantChange(e) {
    setVariant(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    addToast({ variant, message });
    setMessage("");
    setVariant(defaultVariant);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleFormSubmit}>
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
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>

          <ToastShelf />
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
