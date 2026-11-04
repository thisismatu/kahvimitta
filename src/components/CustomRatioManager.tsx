import React, { useState, useRef } from 'react';
import { CustomRatio } from 'types';
import { Button } from 'components/Button';
import { round } from 'utils/math';
import styles from './CustomRatioManager.module.css';

interface CustomRatioManagerProps {
  customRatios: CustomRatio[];
  onAddRatio: (ratio: CustomRatio) => void;
  onDeleteRatio: (id: string) => void;
  onSelectRatio: (ratio: CustomRatio) => void;
  selectedRatioId?: string;
}

export const CustomRatioManager: React.FC<CustomRatioManagerProps> = ({
  customRatios,
  onAddRatio,
  onDeleteRatio,
  onSelectRatio,
  selectedRatioId
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newRatio, setNewRatio] = useState('');
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const deleteTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAdd = () => {
    const ratioValue = parseFloat(newRatio);
    if (newLabel.trim() && !isNaN(ratioValue) && ratioValue > 0) {
      onAddRatio({
        id: Date.now().toString(),
        label: newLabel.trim(),
        ratio: ratioValue
      });
      setNewLabel('');
      setNewRatio('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewLabel('');
    setNewRatio('');
    setIsAdding(false);
  };

  const handleLongPressStart = (id: string) => {
    deleteTimerRef.current = setTimeout(() => {
      setShowDelete(id);
    }, 1000);
  };

  const handleLongPressEnd = () => {
    if (deleteTimerRef.current) {
      clearTimeout(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteRatio(id);
    setShowDelete(null);
  };

  if (!isAdding && customRatios.length === 0) {
    return (
      <Button onClick={() => setIsAdding(true)} className={styles.addButton} tabIndex={3}>
        Add custom ratio
      </Button>
    );
  }

  if (!isAdding) {
    return (
      <>
        {customRatios.map((ratio) => (
          <div key={ratio.id} className={styles.ratioWrapper}>
            <Button
              onClick={() => onSelectRatio(ratio)}
              disabled={selectedRatioId === ratio.id}
              className={styles.ratioButton}
              tabIndex={3}
              onTouchStart={() => handleLongPressStart(ratio.id)}
              onTouchEnd={handleLongPressEnd}
              onTouchCancel={handleLongPressEnd}
              onMouseDown={() => handleLongPressStart(ratio.id)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
            >
              {ratio.label} <small>1:{round(ratio.ratio)}</small>
            </Button>
            {showDelete === ratio.id && (
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(ratio.id, e)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
        <Button onClick={() => setIsAdding(true)} className={styles.addButton} tabIndex={3}>
          +
        </Button>
      </>
    );
  }

  return (
    <div className={styles.addForm}>
      <input
        type="text"
        placeholder="Label"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        className={styles.input}
        autoFocus
      />
      <input
        type="number"
        placeholder="Ratio"
        value={newRatio}
        onChange={(e) => setNewRatio(e.target.value)}
        className={styles.input}
        step="0.01"
        min="0.01"
      />
      <Button onClick={handleAdd} className={styles.submitButton} tabIndex={3}>
        Add
      </Button>
      <Button onClick={handleCancel} className={styles.cancelButton} tabIndex={3}>
        X
      </Button>
    </div>
  );
};
