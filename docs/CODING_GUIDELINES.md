# 🛡️ **CODING GUIDELINES**
## React Native Template Project

*Comprehensive coding standards and best practices for maintaining code quality, preventing duplication, and ensuring consistency across the project.*

---

## 📋 **CRITICAL RULES TO PREVENT DUPLICATION**

### **🚫 NEVER DUPLICATE - ALWAYS CENTRALIZE**

#### **1. 🔍 Before Writing Any Function - CHECK FIRST!**
```bash
# Search for similar functions before creating new ones
grep -r "functionName" src/
grep -r "similar logic pattern" src/
```

#### **2. 📦 Import Management Rules**
```typescript
// ❌ BAD: Importing unused types/enums
import { BadgeVariant, IconSize, Colors } from '@/constants/design';
// Only using Size

// ✅ GOOD: Import only what you use
import { Size } from '@/constants/design';
```

#### **3. 🎯 Function Creation Checklist**
Before creating ANY helper function, ask:
- [ ] Does this function already exist in `/src/utils/`?
- [ ] Is there similar logic in other components?
- [ ] Can this be generalized for reuse?
- [ ] Should this be in utilities instead of component-specific?

#### **4. 🔄 Redux Selector Rules - PREVENT UNWANTED RE-RENDERS**
```typescript
// ❌ BAD: Selecting entire slice causes re-renders on any slice change
const { todayRecord } = useSelector((state: RootState) => state.habits);
const { activeStreaks } = useSelector((state: RootState) => state.streaks);

// ✅ GOOD: Select only the specific property you need
const todayRecord = useSelector((state: RootState) => state.habits.todayRecord);
const activeStreaks = useSelector((state: RootState) => state.streaks.activeStreaks);
```

**Why this matters:**
- **Performance**: Component only re-renders when the specific data changes
- **Efficiency**: Prevents unnecessary renders when unrelated slice data updates
- **React-Redux best practice**: Select minimal data needed

---

## 🏗️ **ARCHITECTURAL PATTERNS**

### **📋 TEMPLATE SYSTEM - CONSISTENT UI COMPONENTS**

Templates provide reusable UI patterns that ensure consistency across screens while eliminating code duplication.

#### **🎯 Template Types & Usage**
```typescript
// ✅ GOOD: Use templates for consistent UI patterns
import {
  BaseScreen,           // Standard screen wrapper
  ScreenHeaderCard,     // Consistent headers  
  ScreenSection,        // Card-based sections
  CategoryCard,         // Category display cards
  PlaceholderScreen     // Unimplemented screens
} from '@/components/templates';
```

#### **🔗 Template Hierarchy**
1. **BaseScreen**: Foundation for all screens
   ```typescript
   // Provides: scrolling, padding, background, comment structure
   <BaseScreen showsVerticalScrollIndicator={false}>
     {children}
   </BaseScreen>
   ```

2. **ScreenHeaderCard**: Standardized headers
   ```typescript
   // Provides: greeting, date, context info with consistent styling
   <ScreenHeaderCard
     greeting="Welcome! 🌅"
     date={new Date().toISOString()}
     contextInfo={{
       text: "Weekend",
       icon: "home-heart", 
       color: Colors.primary
     }}
   />
   ```

3. **ScreenSection**: Card-based content sections
   ```typescript
   // Provides: title, icon, consistent card styling
   <ScreenSection 
     title="Today's Progress" 
     icon="target" 
     iconColor={Colors.primary}
   >
     {content}
   </ScreenSection>
   ```

#### **✅ Template Rules**
1. **ALWAYS use templates** instead of custom UI patterns
2. **BaseScreen** is mandatory for all screens
3. **ScreenSection** for any card-based content
4. **Consistent comment structure** in all components
5. **Props over hardcoded values** for flexibility

---

## 🔧 **IMPLEMENTATION STANDARDS**

### **🌍 INTERNATIONALIZATION (i18n) - MANDATORY REQUIREMENT**

#### **🚫 NEVER Use Hardcoded Strings**
```typescript
// ❌ BAD: Hardcoded strings
const welcomeText = "Welcome";
const saveButton = "Save";
const errorMessage = "Something went wrong";

// ✅ GOOD: Always use i18n
import { t } from '@/utils/i18n';
const welcomeText = t('welcome');
const saveButton = t('save');
const errorMessage = t('error');
```

#### **🎯 i18n Implementation Rules**
```typescript
// ✅ MANDATORY: Import i18n utility
import { t, translate, setAppLanguage } from '@/utils/i18n';

// ✅ GOOD: Use translation keys for all user-facing text
const MyComponent = () => {
  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Button title={t('save')} />
      <Text>{t('app.title')}</Text>
    </View>
  );
};

// ✅ GOOD: Use translate with fallback for safety
const description = translate('tasks.noTasks', 'No tasks available');

// ✅ GOOD: Dynamic translations with variables
const greeting = t('hello', { name: userName });
```

#### **📚 Translation Key Structure**
```typescript
// Use dot notation for nested keys:
t('common.save')           // Basic UI elements
t('app.navigation.home')   // App-specific content
t('features.profile')      // Feature-specific content
t('settings.language')     // Settings content
```

### **📥 Import Organization (STRICT ORDER)**
```typescript
// 1. React/React Native
import React from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { Button } from 'react-native-elements';

// 3. Internationalization (MANDATORY)
import { t, translate } from '@/utils/i18n';

// 4. Design system (centralized)
import { Colors, SPACING, Size } from '@/constants/design';

// 5. Utilities (centralized)
import { getQualityColor, formatTime } from '@/utils';

// 6. Types
import { User, Product } from '@/types';

// 7. Local components
import { Card, Badge } from '../atoms';
```

---

## 🎨 **COMPONENT ARCHITECTURE**

### **Component Structure Pattern**

```typescript
/**
 * Component Documentation Block
 *
 * @component
 * @example
 * <ComponentName
 *   title="Example"
 *   variant="compact"
 *   onPress={() => {}}
 * />
 *
 * @usage Used in:
 * - Screen A, Screen B
 * - Organism X, Organism Y
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

// Design system imports
import { Colors, SPACING, Size } from '@/constants/design';
import { helperFunction } from '@/utils';

// Component imports
import { Atom1, Atom2 } from '../atoms';

// Props interface
interface ComponentProps {
  /**
   * Primary content or label
   */
  title: string;

  /**
   * Visual variant of the component
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'minimal';

  /**
   * Component size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Additional styling
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback function
   */
  onPress?: () => void;
}

// Main component
const ComponentName: React.FC<ComponentProps> = ({
  // Destructured props with defaults
  title,
  variant = 'default',
  size = Size.MEDIUM,
  style,
  onPress,
}) => {
  // Render methods for complex components
  const renderSection1 = () => (
    <View style={styles.section1}>
      {/* Section content */}
    </View>
  );

  const renderSection2 = () => (
    <View style={styles.section2}>
      {/* Section content */}
    </View>
  );

  // Main render with variant handling
  return (
    <View style={[styles.container, style]}>
      {variant === 'compact' ? (
        renderSection1()
      ) : (
        <>
          {renderSection1()}
          {renderSection2()}
        </>
      )}
    </View>
  );
};

// Styles using design system
const styles = StyleSheet.create({
  container: {
    padding: SPACING.MD,
    backgroundColor: Colors.surface,
  },
  section1: {
    marginBottom: SPACING.SM,
  },
  section2: {
    marginTop: SPACING.SM,
  },
});

export default ComponentName;
```

---

## 🔒 **CODE QUALITY STANDARDS**

### **TypeScript Configuration**
- **Strict mode**: Always enabled
- **No any types**: Use proper TypeScript typing
- **Exact optional properties**: Prevent undefined behavior
- **Path aliases**: Use @/ for clean imports

### **ESLint & Prettier Integration**
```json
// package.json scripts
{
  "scripts": {
    "lint": "eslint src/",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint:format": "npm run lint && npm run format"
  }
}
```

### **Import Organization Standards**
1. **React/React Native** imports first
2. **Third-party** library imports
3. **Internationalization** imports (mandatory)
4. **Design system** imports
5. **Utilities** imports
6. **Types** imports
7. **Local component** imports (relative paths)

---

## 🚨 **RED FLAGS - DUPLICATION WARNING SIGNS**

### **⚠️ Immediate Action Required When You See:**
1. **Same function name** in multiple files
2. **Similar logic patterns** across components
3. **Copy-paste code** from other files
4. **Color calculations** in multiple places
5. **Formatting functions** repeated
6. **Hardcoded strings** in components

### **🔍 Regular Audit Commands**
```bash
# Find potential duplicates
grep -r "const get.*Color" src/components/
grep -r "const format" src/components/
grep -r "const get.*Variant" src/components/

# Check for hardcoded strings (i18n violations)
grep -r '"[A-Z].*"' src/components/ src/screens/
grep -r "'[A-Z].*'" src/components/ src/screens/
```

---

## 📚 **CENTRALIZED UTILITIES REFERENCE**

### **🎯 Quality & Scoring**
```typescript
// ALWAYS use these instead of creating new ones
import {
  getQualityColor,      // For quality-based colors
  getScoreColor,        // For percentage-based colors
  getProgressVariant,   // For progress bar variants
  getScoreBadgeVariant  // For score badge variants
} from '@/utils';
```

### **📐 Size & Layout**
```typescript
// ALWAYS use these for consistent sizing
import {
  sizeToIconSize,       // Convert Size to IconSize
  getNumericIconSize    // Get pixel values
} from '@/utils';
```

---

## 🎯 **DEVELOPMENT WORKFLOW**

### **✅ Before Creating Any Function:**
1. **Search existing utilities**: Check `/src/utils/helpers.ts`
2. **Search components**: `grep -r "similar pattern" src/`
3. **Check design system**: Look in `/src/constants/design/`
4. **Ask**: "Will this be used elsewhere?"

### **✅ When Adding New Functionality:**
1. **Start in utilities** if it might be reused
2. **Use TypeScript** for proper type safety
3. **Add JSDoc comments** for documentation
4. **Test with multiple use cases**
5. **Consider i18n from the start**

### **✅ Code Review Checklist:**
- [ ] No duplicate functions across files
- [ ] All utilities properly imported
- [ ] No unused imports
- [ ] Consistent import order
- [ ] **MANDATORY: No hardcoded strings - all text uses i18n**
- [ ] **MANDATORY: i18n utility imported where needed**
- [ ] **MANDATORY: Translation keys follow dot notation structure**
- [ ] Type safety maintained
- [ ] RTL language support considered

---

## 📊 **MONITORING & MAINTENANCE**

### **🔄 Regular Cleanup Tasks**
- **Weekly**: Search for new duplicate patterns
- **Weekly**: Scan for hardcoded strings using audit commands
- **Monthly**: Audit component functions for centralization opportunities
- **Monthly**: Review translation coverage and missing keys
- **Before releases**: Full codebase duplicate scan
- **Before releases**: Complete i18n audit for all user-facing text

### **📈 Success Metrics**
- **Zero duplicate functions** across components
- **All utilities centralized** in `/src/utils/`
- **Consistent import patterns** across files
- **Zero hardcoded strings** in user-facing components
- **Complete translation coverage** for all supported languages
- **RTL support** working correctly

---

## 🌟 **Golden Rules:**

1. **SEARCH BEFORE CREATE** - Always check existing utilities
2. **CENTRALIZE IMMEDIATELY** - Don't wait for "later"
3. **NEVER HARDCODE STRINGS** - Always use i18n for user-facing text
4. **IMPORT ONLY NEEDED** - Keep imports clean
5. **DOCUMENT EVERYTHING** - Help your future self
6. **SUPPORT ALL LANGUAGES** - Ensure RTL and translation coverage
7. **TYPE EVERYTHING** - Use strict TypeScript
8. **TEST THOROUGHLY** - Verify all functionality

---

**Quality code is maintainable code. Follow these guidelines to ensure our codebase remains clean, efficient, and scalable!** 🚀